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
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="flex items-center justify-center h-screen">
                <div 
                    className="text-xl font-bold text-gray-800 bg-orange-200 rounded-full w-64 h-12 flex items-center justify-center shadow-lg cursor-pointer transform transition-transform hover:scale-105 hover:bg-orange-300 hover:text-2xl"
                    onClick={handleTemperatureClick}
                >
                    <p>Temperature</p>
                </div>

                <div 
                    className="text-xl font-bold text-gray-800 bg-blue-200 rounded-full w-64 h-12 flex items-center justify-center shadow-lg cursor-pointer transform transition-transform hover:scale-105 hover:bg-blue-300 hover:text-2xl ml-6"
                    onClick={handleHumidityClick}
                >
                    <p>Humidity</p>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;







