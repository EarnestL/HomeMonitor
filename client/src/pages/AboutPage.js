import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

function AboutPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-gray-700 bg-gray-50">
            {/* Header */}
            <header className="mb-12 text-center">
                <h1 className="text-4xl font-bold text-gray-600 mb-4">About HomeMonitor</h1>
                <p className="text-lg text-gray-500 max-w-xl">
                    HomeMonitor is your essential home dashboard, designed to help you monitor key aspects of your home environment. 
                    Monitoring covers various elements such as ambient temperature, humidity, light levels, and many more. 
                    Stay informed and comfortable with real-time insights, alerts, and intuitive graphics.
                </p>
            </header>

            {/* Content Section */}
            <section className="max-w-3xl text-center space-y-8">
                {/* What We Do */}
                <div>
                    <h2 className="text-2xl font-semibold text-gray-600 mb-2">Live Demonstration</h2>
                    <p className="text-gray-500">
                        My home is being monitored and live data is being utilized.
                        <br/>
                        Two components are currently available: 
                        <a href="/temperature" className="text-orange-400 font-semibold hover:text-orange-300"> Temperature</a> and 
                        <a href="/humidity" className="text-blue-400 font-semibold hover:text-blue-300"> Humidity</a>. 
                        DHT11 sensor is being used to collect both of the attributes.
                    </p>
                </div>
            </section>
            <footer className="mt-12">
                <a 
                    href="https://github.com/EarnestL/HomeMonitor" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-500 hover:text-gray-700"
                >
                    <FontAwesomeIcon icon={faGithub} className="h-8 w-8" />
                </a>
            </footer>
        </div>
    );
}

export default AboutPage;
