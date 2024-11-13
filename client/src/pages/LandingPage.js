import React from 'react';
import { ReactComponent as HomeIcon } from '../assets/HomeIcon.svg'; // Adjust the path as needed
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate();
    return (
        <div className="text-gray-700 h-screen flex flex-col justify-center items-center">
            <section className="text-center flex flex-col items-center space-y-4">
                <HomeIcon className="w-24 h-24 text-purple-400 animate-puff" />
                <p className="text-xl text-gray-400 font-semibold tracking-tight">Your Home’s Essential Dashboard</p>
                <div className="flex space-x-4 mt-4">
                    <button 
                        onClick={()=> navigate('/temperature')}
                        className="px-4 py-2 bg-orange-400 text-white rounded-lg shadow-md hover:text-gray-200 hover:bg-orange-500">
                        Temperature
                    </button>
                    <button 
                        onClick={()=> navigate('/humidity')}
                        className="px-4 py-2 bg-blue-400 text-white rounded-lg shadow-md hover:text-gray-200 hover:bg-blue-500">
                        Humidity
                    </button>
                </div>
            </section>
        </div>
    );
}

export default LandingPage;











