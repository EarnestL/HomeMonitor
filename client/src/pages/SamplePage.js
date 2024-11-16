import React, { useEffect, useState } from "react";

const SamplePage = () => {
    const [webSocket, setWebSocket] = useState(null);
    const [status, setStatus] = useState("Disconnected");
    const [receivedMessage, setReceivedMessage] = useState("");

    // WebSocket server URL
    const wsUrl = "ws://10.0.0.15:81"; // Replace with your ESP32 WebSocket URL
    const messageToSend = "get_lights_data";  // Replace with your desired message

    // Initialize WebSocket connection
    useEffect(() => {
        const ws = new WebSocket(wsUrl);
        setWebSocket(ws);

        // WebSocket event handlers
        ws.onopen = () => {
            console.log("WebSocket connected");
            setStatus("Connected");
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("Message from server:", data);
            setReceivedMessage(data);
        };

        ws.onclose = () => {
            console.log("WebSocket disconnected");
            setStatus("Disconnected");
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        // Cleanup on component unmount
        return () => {
            ws.close();
        };
    }, [wsUrl]);

    // Send message to WebSocket server
    const sendMessage = () => {
        if (webSocket && webSocket.readyState === WebSocket.OPEN) {
            webSocket.send(messageToSend);
            console.log(`Message sent: ${messageToSend}`);
        } else {
            console.error("WebSocket is not connected");
        }
    };

    return (
        <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
            <h1>ESP32 WebSocket Page</h1>
            <p>WebSocket Status: <strong>{status}</strong></p>

            <button
                onClick={sendMessage}
                disabled={status !== "Connected"}
                style={{
                    padding: "10px 20px",
                    backgroundColor: status === "Connected" ? "#007bff" : "#cccccc",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: status === "Connected" ? "pointer" : "not-allowed",
                }}
            >
                Send Message
            </button>

            <div style={{ marginTop: "20px" }}>
                <h3>Received Message:</h3>
                <p style={{ fontSize: "16px", color: "#333", whiteSpace: "pre-wrap" }}>
                    {receivedMessage
                        ? JSON.stringify(receivedMessage, null, 1)
                        : "No messages received yet."}
                </p>
            </div>
        </div>
    );
};

export default SamplePage;

