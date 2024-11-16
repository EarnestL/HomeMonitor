import websocket
import time

# WebSocket server URL
ESP32_WEBSOCKET_URL = "ws://10.0.0.15:81"  # Replace <ESP32-IP> with your ESP32's IP address

def on_message(ws, message):
    print(f"Message from ESP32: {message}")

def on_error(ws, error):
    print(f"WebSocket error: {error}")

def on_close(ws, close_status_code, close_msg):
    print("WebSocket connection closed")

def on_open(ws):
    print("WebSocket connection opened")
    # Example: Send a message to the ESP32
    ws.send("get_lights_data")  # Replace with your command
    print("Message sent")
    time.sleep(1)  # Wait for 1 second before closing the connection

# Create WebSocket connection
ws = websocket.WebSocketApp(
    ESP32_WEBSOCKET_URL,
    on_message=on_message,
    on_error=on_error,
    on_close=on_close
)

# Open the WebSocket connection and send a message
ws.on_open = on_open
ws.run_forever()
