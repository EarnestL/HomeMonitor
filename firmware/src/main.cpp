#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <DHT.h>
#include <DHT_U.h>
#include <ArduinoJson.h>

#define DHTPIN 2
#define DHTTYPE DHT11
#define TOLERANCE 10

const char* ssid = WIFI_SSID;
const char* password = WIFI_PASSWORD;
const char* serverUrl = API_BASE_URL;

/*
void loop() {

    if (WiFi.status() == WL_CONNECTED) {
        HTTPClient http;
        http.begin(serverUrl); // No need to set insecure mode for basic HTTPS requests on ESP32

        int httpResponseCode = http.GET();
        if (httpResponseCode > 0) {
            String response = http.getString();
            Serial.println(httpResponseCode);
            Serial.println(response);
        } else {
            Serial.print("Error on sending GET: ");
            Serial.println(httpResponseCode);
        }
        http.end();
    }
    delay(10000); // Send data every 10 seconds
    */

/*
    sensors_event_t event;
    dht.temperature().getEvent(&event);
    if (!isnan(event.temperature)) {
        Serial.print("Temperature: ");
        Serial.print(event.temperature);
        Serial.println(" °C");
    } else {
        Serial.println("Error reading temperature!");
    }

    dht.humidity().getEvent(&event);
    if (!isnan(event.relative_humidity)) {
        Serial.print("Humidity: ");
        Serial.print(event.relative_humidity);
        Serial.println(" %");
    } else {
        Serial.println("Error reading humidity!");
    }

}
*/

// Task Handles
TaskHandle_t sensor_task_handle = NULL;
TaskHandle_t http_task_handle = NULL;

// Shared Resource
int temp_error_count = 0;
int hum_error_count = 0;
int temp_data_count = 0;
int hum_data_count = 0;
float avg_temp = 0;
float avg_hum = 0;

// Mutex Handle
SemaphoreHandle_t mutex;

DHT_Unified dht(DHTPIN, DHTTYPE);

// helper functions
void wifi_init();
void wifi_end();
int http_request(JsonDocument&, String);

// Task Function Prototypes
void sensor_task(void *pvParameters);
void http_task(void *pvParameters);

void setup() {
    Serial.begin(115200);

    dht.begin();

    // Create the mutex before creating tasks
    mutex = xSemaphoreCreateMutex();

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
    );
}

void loop() {
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
    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.print("Connecting to WiFi ");
        Serial.println(WIFI_SSID);
    }
    Serial.println("Connected to WiFi");
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




