#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <DHT.h>
#include <DHT_U.h>

#define DHTPIN 2
#define DHTTYPE DHT11
#define TOLERANCE 10

const char* ssid = WIFI_SSID;
const char* password = WIFI_PASSWORD;
const char* serverUrl = WIFI_BASE_URL;

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
int temp_data_count = 0;
int hum_data_count = 0;
float avg_temp = 0;
float avg_hum = 0;

// Mutex Handle
SemaphoreHandle_t mutex;

DHT_Unified dht(DHTPIN, DHTTYPE);

// Task Function Prototypes
void sensor_task(void *pvParameters);
void http_task(void *pvParameters);

void setup() {
    Serial.begin(115200);
    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.println("Connecting to WiFi...");
    }
    Serial.println("Connected to WiFi");

    dht.begin();

    // Create the mutex before creating tasks
    mutex = xSemaphoreCreateMutex();

    // Create Task1 with priority 1 and Task2 with priority 2
    xTaskCreate(
        sensor_task,        // Task function
        "Sensor Task",     // Name of task
        2000,         // Stack size in words
        NULL,         // Parameter passed to task
        2,            // Priority of task (higher numbers indicate higher priority)
        &sensor_task_handle  // Task handle
    );

    xTaskCreate(
        http_task,
        "Http Task",
        1000,
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
            Serial.println("Error reading temperature!");
          }

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
            Serial.println("Error reading humidity!");
          }

          Serial.print("temp:");
          Serial.println(avg_temp, 3);
          Serial.print("hum:");
          Serial.println(avg_hum, 3);
          
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

          Serial.println("DATA SEND!");
          // Give back the mutex
          xSemaphoreGive(mutex);
          vTaskDelay(10000 / portTICK_PERIOD_MS);  // Delay for 10 minutes
        }
    }
}
//600000






