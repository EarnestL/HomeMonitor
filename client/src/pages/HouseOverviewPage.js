import React, { useState, useEffect } from 'react';
import FloorPlan from '../components/FloorPlan';
import SideBar from '../components/SideBar';
import LoadingDots from '../components/LoadingDots'
import mqtt from "mqtt";

const HouseOverviewPage = () => {
  const [highlightedLight, setHighlightedLight] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading
  const [socketAlive, setSocketAlive] = useState(false);
  const [receivedData, setReceivedData] = useState(null);

  const brokerUrl = process.env.REACT_APP_MQTT_BROKER;
  const subscribedTopic = "iot/home/lights/status";
  const publishTopic = "web/home/lights/status";

  useEffect(() => {
    // MQTT connection options
    const options = {
      username: process.env.REACT_APP_MQTT_USERNAME,
      password: process.env.REACT_APP_MQTT_PASSWORD,
      reconnectPeriod: 1000, // Reconnect after 1 second if disconnected
    };

    // Connect to the MQTT broker
    const client = mqtt.connect(brokerUrl, options);

    client.on("connect", () => {
      console.log("Connected to MQTT broker");
      setSocketAlive(true);
      client.subscribe(subscribedTopic, (err) => {
        if (!err) {
          console.log(`Subscribed to topic: ${subscribedTopic}`);
          client.publish(publishTopic, "GetStatus");
        } else {
          console.error("Subscription error:", err);
        }
      });
    });

    client.on("message", (subscribedTopic, message) => {
      const data = JSON.parse(message);
      setReceivedData(data);
    });

    client.on("error", (err) => {
      console.error("MQTT connection error:", err);
      setSocketAlive(false);
    });

    return () => {
      client.end(); // Disconnect from the broker when the component unmounts
    };
  }, []);

  const lights = receivedData != null ? receivedData.lights : 
    [
      { name: 'Lamp 1', isOn: false },
      { name: 'Lamp 2', isOn: false },
      { name: 'Lamp 3', isOn: false },
    ];

  useEffect(() => {
    // Simulate data fetching or some processing time
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds (or when data is ready)
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex justify-center items-start w-screen h-screen bg-gray-100 space-x-4 mt-32">
      {loading ? (
        // Display loading indicator when the page is loading
        <div className="h-screen w-full flex items-center justify-center -mt-24">
          <LoadingDots />
        </div>
      ) : (
        // Page content is displayed once loading is complete
        <>
          <FloorPlan lights={lights} highlightedLight={highlightedLight} setHighlightedLight={setHighlightedLight} />
          <SideBar lights={lights} highlightedLight={highlightedLight} setHighlightedLight={setHighlightedLight} isLive={socketAlive && receivedData != null}/>
        </>
      )}
    </div>
  );
};

export default HouseOverviewPage;


