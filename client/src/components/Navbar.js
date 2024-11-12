import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(window.location.pathname);

    // Navigate and set active tab
    const handleTabClick = (path) => {
        navigate(path);
        setActiveTab(path);
    };

    // Sync activeTab with the current path on page load or refresh
    useEffect(() => {
        setActiveTab(window.location.pathname);
    }, []);

    // Define the consistent background color for selected tabs and the page
    const activeBackgroundColor = 'bg-blue-50';

    return (
        <nav className="fixed top-0 left-0 w-full z-10 bg-gray-200 flex justify-between px-8 py-4">
            {/* HomeMonitor title on the left */}
            <div
                className="text-2xl font-bold text-blue-500 cursor-pointer hover:text-blue-400"
                onClick={() => handleTabClick('/')}
            >
                HomeMonitor
            </div>

            {/* Navigation tabs on the right */}
            <div className="flex space-x-4">
                {/* Temperature Tab */}
                <div
                    className={`px-4 py-2 -mb-4 rounded-t-xl font-bold cursor-pointer transition ${activeTab === '/temperature' ? `${activeBackgroundColor} text-blue-500 text-xl` : 'bg-gray-300 text-gray-600 hover:bg-gray-400 rounded-xl -mb-2'}`}
                    onClick={() => handleTabClick('/temperature')}
                >
                    Temperature
                </div>

                {/* Humidity Tab */}
                <div
                    className={`px-4 py-2 -mb-4 rounded-t-xl font-bold cursor-pointer transition ${activeTab === '/humidity' ? `${activeBackgroundColor} text-blue-500 text-xl` : 'bg-gray-300 text-gray-600 hover:bg-gray-400 rounded-xl -mb-2'}`}
                    onClick={() => handleTabClick('/humidity')}
                >
                    Humidity
                </div>

                {/* Info Tab */}
                <div
                    className={` text-blue-400 px-4 py-2 -mb-4 rounded-t-full font-bold cursor-pointer transition ${activeTab === '/info' ? `${activeBackgroundColor} text-xl` : 'bg-gray-300 hover:bg-gray-400 rounded-full -mb-2'}`}
                    onClick={() => handleTabClick('/info')}
                >
                    i
                </div>
            </div>
        </nav>
    );
}

export default Navbar;



