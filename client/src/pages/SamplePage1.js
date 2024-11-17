import React, { useEffect, useState } from "react";
import mqtt from "mqtt";

const SamplePage = () => {
  const [lightStatus, setLightStatus] = useState("Loading..."); // Light status state
  const brokerUrl = process.env.REACT_APP_MQTT_BROKER;
  const topic = "home/light/status";

  useEffect(() => {
    // MQTT connection options
    const options = {
      username: process.env.REACT_APP_MQTT_USERNAME, // Your MQTT username
      password: process.env.REACT_APP_MQTT_PASSWORD, // Your MQTT password
      reconnectPeriod: 1000, // Reconnect after 1 second if disconnected
    };

    // Connect to the MQTT broker
    const client = mqtt.connect(brokerUrl, options);

    client.on("connect", () => {
      console.log("Connected to MQTT broker");
      client.subscribe(topic, (err) => {
        if (!err) {
          console.log(`Subscribed to topic: ${topic}`);
        } else {
          console.error("Subscription error:", err);
        }
      });
    });

    client.on("message", (topic, message) => {
      console.log(`Message received on topic ${topic}: ${message}`);
      setLightStatus(message.toString());
    });

    client.on("error", (err) => {
      console.error("MQTT connection error:", err);
    });

    return () => {
      client.end(); // Disconnect from the broker when the component unmounts
    };
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px", fontFamily: "Arial, sans-serif" }}>
      <h1>ESP32 Light Status</h1>
      <div
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          color: lightStatus === "ON" ? "green" : "red",
          marginTop: "20px",
        }}
      >
        {lightStatus === "ON" ? "Light is ON" : "Light is OFF"}
      </div>
    </div>
  );
};

export default SamplePage;
