#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <DHT.h>
#include <DHT_U.h>
#include <ArduinoJson.h>
#include <WebSocketsServer.h>

#define WEBSOCKET_PORT 81
#define DHTPIN 2
#define DHTTYPE DHT11
#define LIGHT1PIN 32
#define TOLERANCE 10

const char* ssid = WIFI_SSID;
const char* password = WIFI_PASSWORD;
const char* serverUrl = API_BASE_URL;

// Static IP configuration
IPAddress local_IP(10, 0, 0, 15);    // Desired static IP
IPAddress gateway(10, 0, 0, 1);       // Router's gateway IP
IPAddress subnet(255, 255, 255, 0);   // Subnet mask


// Task Handles
TaskHandle_t sensor_task_handle = NULL;
TaskHandle_t http_task_handle = NULL;
TaskHandle_t webSocketTaskHandle = NULL;
TaskHandle_t prTaskHandle = NULL;

//Websocket data structures
struct lights_struct {
    bool lamp1;
    bool lamp2;
    bool lamp3;
};
struct websocket_data {
    lights_struct lights;
};

// Shared Resource
int temp_error_count = 0;
int hum_error_count = 0;
int temp_data_count = 0;
int hum_data_count = 0;
float avg_temp = 0;
float avg_hum = 0;

//global socket_data
websocket_data socket_data = {
    {false, false, false}
};

// Mutex Handle
SemaphoreHandle_t mutex;

DHT_Unified dht(DHTPIN, DHTTYPE);
WebSocketsServer webSocket = WebSocketsServer(WEBSOCKET_PORT);

// helper functions
void wifi_init();
void wifi_end();
int http_request(JsonDocument&, String);
String get_socket_data();
// WebSocket event handler
void webSocketEvent(uint8_t, WStype_t, uint8_t*, size_t);

// Task Function Prototypes
void sensor_task(void *);
void http_task(void *);
void webSocketTask(void*);
void lightsTask(void*);

void setup() {
    Serial.begin(115200);
    wifi_init();
    // Start sensor
    dht.begin();
    // Start WebSocket server
    webSocket.begin();
    webSocket.onEvent(webSocketEvent);

    pinMode(32, INPUT);
    // Create the mutex before creating tasks
    mutex = xSemaphoreCreateMutex();
/*
    xTaskCreate(
        sensor_task,
        "Sensor Task",
        2000,
        NULL,
        2,
        &sensor_task_handle
    );

    xTaskCreate(
        http_task,
        "Http Task",
        10000,
        NULL,
        1,
        &http_task_handle
    );*/

    xTaskCreate(
        webSocketTask, 
        "WebSocket Task", 
        4096, 
        NULL, 
        1, 
        &webSocketTaskHandle
    );

    xTaskCreate(
        lightsTask, 
        "PR Task", 
        4096, 
        NULL, 
        1, 
        &prTaskHandle
    );
}

void loop() {
}

void lightsTask(void* pv){
    while(true){
        if(analogRead(LIGHT1PIN) > 1000 && !socket_data.lights.lamp1){
            socket_data.lights.lamp1 = true;
            String json_data = get_socket_data();

            webSocket.broadcastTXT(json_data);
        }else if (analogRead(LIGHT1PIN) <= 1000 && socket_data.lights.lamp1){
            socket_data.lights.lamp1 = false;
            String json_data = get_socket_data();

            webSocket.broadcastTXT(json_data);
        }
    }
}

// Task for handling WebSocket server
void webSocketTask(void *pvParameters) {
    while (true) {
        webSocket.loop(); // Keep WebSocket server running
        vTaskDelay(10 / portTICK_PERIOD_MS); // Delay to yield to other tasks
    }
}

// Task 1 - Lower Priority Task
void sensor_task(void *pvParameters) {
    while (true) {
        if (xSemaphoreTake(mutex, portMAX_DELAY)) { // Try to take the mutex

          sensors_event_t event;

        //temperature task
          dht.temperature().getEvent(&event);
          float curr_temp = event.temperature;

          if (!temp_data_count && !isnan(curr_temp)){
            avg_temp = curr_temp;
            temp_data_count = 1;
          }
          else if (!isnan(curr_temp) && abs(avg_temp - curr_temp) <= TOLERANCE) {
            avg_temp = ((avg_temp * temp_data_count) + curr_temp ) / (temp_data_count+1);
            temp_data_count++;
          } else {
            temp_error_count++;
            Serial.println("Error reading temperature!");
          }

        //humidity task
          dht.humidity().getEvent(&event);
          float curr_hum = event.relative_humidity;

          if (!hum_data_count && !isnan(curr_hum)){
            avg_hum = curr_hum;
            hum_data_count = 1;
          }
          else if (!isnan(curr_hum) && abs(avg_hum - curr_hum) <= TOLERANCE) {
            avg_hum = ((avg_hum * hum_data_count) + curr_hum ) / (hum_data_count+1);
            hum_data_count++;
          } else {
            hum_error_count++;
            Serial.println("Error reading humidity!");
          }
          
          xSemaphoreGive(mutex); // Give back the mutex
        }
        vTaskDelay(3000 / portTICK_PERIOD_MS);  // Delay for 3 seconds
    }
}

// Task 2 - Higher Priority Task
void http_task(void *pvParameters) {
    while (true) {
        // Try to take the mutex
        if (xSemaphoreTake(mutex, portMAX_DELAY)) {

            StaticJsonDocument<200> data;

            //temperature
            float coverage = temp_data_count / (temp_error_count + temp_data_count) * 100;
            data["val"] = avg_temp;
            data["coverage"] = coverage;

            int res = 0;
            while (!res){
                res = http_request(data, "/temperature");
            }
            Serial.println("DATA SEND!");

            temp_data_count = 0;
            temp_error_count = 0;

            //humidity
            coverage = hum_data_count / (hum_error_count + hum_data_count) * 100;
            data["val"] = avg_hum;
            data["coverage"] = coverage;

            res = 0;
            while (!res){
                res = http_request(data, "/humidity");
            }
            Serial.println("DATA SEND!");

            hum_data_count = 0;
            hum_error_count = 0;
            
            // Give back the mutex
            xSemaphoreGive(mutex);
            vTaskDelay(600000 / portTICK_PERIOD_MS);  // Delay for 10 minutes
        }
    }
}

void wifi_init(){
    // Configure static IP
    if (!WiFi.config(local_IP, gateway, subnet)) {
        Serial.println("Static IP configuration failed!");
    }

    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.print("Connecting to WiFi ");
        Serial.println(ssid);
    }
    Serial.println("Connected to WiFi");
        Serial.print("ESP32 IP Address: ");
    Serial.println(WiFi.localIP());
}

void wifi_end(){
    WiFi.disconnect(true);
    WiFi.mode(WIFI_OFF);
    Serial.println("Disconnected from WiFi");
}

int http_request(JsonDocument& data, String route){

    wifi_init();
    String body;
    serializeJson(data, body);

    if (WiFi.status() == WL_CONNECTED) {
        HTTPClient http;
        http.setTimeout(60000); // to handle spin down of server
        http.begin(String(serverUrl) + route);
        http.addHeader("Content-Type", "application/json");

        int httpResponseCode = http.POST(body);

        if (httpResponseCode > 0) {
            String response = http.getString();
            Serial.println(httpResponseCode);
            Serial.println(response);
        } else {
            Serial.print("Error on sending POST: ");
            Serial.println(httpResponseCode);
            http.end();
            wifi_end();
            return 0;
        }
        http.end();
    }
    wifi_end();
    return 1;
}

// WebSocket event handler
void webSocketEvent(uint8_t num, WStype_t type, uint8_t * payload, size_t length) {
    if (type == WStype_TEXT) {
        String message = String((char*)payload);
        Serial.print(message);

        // Example action: toggle LED based on received message
        if (message == "get_lights_data") {
            digitalWrite(2, HIGH); // Toggle LED
            vTaskDelay(1000 / portTICK_PERIOD_MS);
            digitalWrite(2, LOW); // Toggle LED

            String json_data = get_socket_data();

            webSocket.sendTXT(num, json_data);
            Serial.println("message received and sent");
        } else {
            Serial.print("message wrong");
        }
    }
}

String get_socket_data(){

    StaticJsonDocument<200> jsonDoc;

    JsonObject lights = jsonDoc.createNestedObject("lights");
    lights["lamp1"] = socket_data.lights.lamp1;
    lights["lamp2"] = socket_data.lights.lamp2;
    lights["lamp3"] = socket_data.lights.lamp3;

    // Serialize JSON to a string
    String jsonString;
    serializeJson(jsonDoc, jsonString);

    return jsonString;
}

