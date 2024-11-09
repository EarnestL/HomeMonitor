import React, { useState, useEffect } from 'react';

function LiveTempCard({ currentTemp = 25 }) {
    return (
        <div className="bg-white rounded-lg shadow-lg p-8 w-80 h-80 mx-auto flex flex-col items-center justify-center">
            {/* Live Label */}
            <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500 animate-smooth-pulse" />
                <p className="text-sm text-green-500 font-semibold">Live</p>
            </div>

            {/* Temperature Display */}
            <div className="text-center">
                <p className="text-2xl text-gray-400">Current Temp</p>
                <p className="text-6xl text-orange-400 font-bold">{currentTemp}°C</p>
            </div>

            {/* Temperature Info */}
            <div className="text-gray-500 text-center mt-4">
                <p>other info: <span className="text-green-600 font-bold">data</span></p>
                <p>other info: <span className="text-green-600 font-bold">data</span></p>
            </div>
        </div>
    );
}

export default LiveTempCard;

