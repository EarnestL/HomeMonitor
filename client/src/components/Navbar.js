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
        <nav className="fixed top-0 left-0 w-full z-10 bg-gray-200 flex justify-between items-center px-8" style={{ height: '60px' }}>
            {/* HomeMonitor title on the left */}
            <div
                className="text-2xl font-bold text-purple-400 cursor-pointer hover:text-purple-300"
                onClick={() => handleTabClick('/')}
            >
                HomeMonitor
            </div>

            {/* Navigation tabs on the right */}
            <div className="flex space-x-4 h-full">
                {/* Temperature Tab */}
                <div
                    className="flex items-center justify-center h-full cursor-pointer"
                    onClick={() => handleTabClick('/temperature')}
                >
                    <div
                        className={`px-4 font-bold transition ${
                            activeTab === '/temperature'
                                ? `${activeBackgroundColor} text-blue-500 text-xl py-4 rounded-t-xl`
                                : 'bg-gray-300 text-gray-600 hover:bg-gray-400 py-2 rounded-xl'
                        }`}
                    >
                        Temperature
                    </div>
                </div>

                {/* Humidity Tab */}
                <div
                    className="flex items-center justify-center h-full cursor-pointer"
                    onClick={() => handleTabClick('/humidity')}
                >
                    <div
                        className={`px-4 font-bold transition ${
                            activeTab === '/humidity'
                                ? `${activeBackgroundColor} text-blue-500 text-xl py-4 rounded-t-xl`
                                : 'bg-gray-300 text-gray-600 hover:bg-gray-400 py-2 rounded-xl'
                        }`}
                    >
                        Humidity
                    </div>
                </div>

                {/* Info Tab */}
                <div
                    className="flex items-center justify-center h-full cursor-pointer"
                    onClick={() => handleTabClick('/about')}
                >
                    <div
                        className={`px-4 font-bold transition text-blue-400 ${
                            activeTab === '/about'
                                ? `${activeBackgroundColor} text-xl rounded-t-full py-4`
                                : 'bg-gray-300 hover:bg-gray-400 rounded-full py-2'
                        }`}
                    >
                        i
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;







