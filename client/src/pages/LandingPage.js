import React from 'react';
import { ReactComponent as HomeIcon } from '../assets/HomeIcon.svg'; // Adjust the path as needed

function LandingPage() {
    return (
        <div className="text-gray-700 h-screen flex flex-col justify-center items-center">
            <section className="text-center flex flex-col items-center space-y-4">
                <HomeIcon className="w-24 h-24 text-purple-400 animate-puff" />
                <p className="text-xl text-gray-400 font-semibold tracking-tight">Your Home’s Essential Dashboard</p>
            </section>
        </div>
    );
}

export default LandingPage;











