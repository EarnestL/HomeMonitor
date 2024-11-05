import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate();
    
    const handleTemperatureClick = () => {
        navigate('/temperature');
    };

    const handleHumidityClick = () => {
        console.log("Humidity clicked");
    };

    return (
        <div className="min-h-screen p-4">
        </div>
    );
}

export default LandingPage;







