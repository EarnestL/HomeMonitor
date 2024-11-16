import React, { useState, useEffect } from 'react';
import FloorPlan from '../components/FloorPlan';
import SideBar from '../components/SideBar';
import LoadingDots from '../components/LoadingDots'

const HouseOverviewPage = () => {
  const [highlightedLight, setHighlightedLight] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading
  const [webSocket, setWebSocket] = useState(null);
  const [socketAlive, setSocketAlive] = useState(false);
  const [receivedData, setReceivedData] = useState(null);

  // WebSocket server URL
  const wsUrl = "ws://10.0.0.15:81";

  // Initialize WebSocket connection
  useEffect(() => {
      const ws = new WebSocket(wsUrl);
      setWebSocket(ws);

      // WebSocket event handlers
      ws.onopen = () => {
          console.log("WebSocket connected");
          setSocketAlive(true);
          ws.send("get_lights_data");
      };

      ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          console.log("Message from server:", data);
          setReceivedData(data);
      };

      ws.onclose = () => {
          console.log("WebSocket disconnected");
          setSocketAlive(false);
      };

      ws.onerror = (error) => {
          console.error("WebSocket error:", error);
      };

      // Cleanup on component unmount
      return () => {
          ws.close();
      };
  }, [wsUrl]);

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


