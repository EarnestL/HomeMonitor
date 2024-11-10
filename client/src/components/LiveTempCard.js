import React, { useState, useEffect } from 'react';

function LiveTempCard({ currentTemp = 25 }) {
    const apiEndpoint = `${process.env.REACT_APP_API_BASE}/temperature?recent=true`;

    const [latestData, setLatestData] = useState(null);
    const [loading, setLoading] = useState(true);
    const acceptableTimeDiff = 30 * 60 * 1000; // 30 mins difference will still be considered live

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(apiEndpoint);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            const formattedData = {
                recorded_at: new Date(data[0].recorded_at),
                temp: data[0].val,
                coverage: data[0].coverage,
            };
            setLatestData(formattedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (latestData) {
            console.log("Updated latestData:", latestData);
        }
    }, [latestData]);

    let currTime = new Date();
    const isLive = latestData && (currTime - latestData.recorded_at <= acceptableTimeDiff);

    return (
        <div className="bg-white rounded-lg shadow-lg w-full h-full mx-auto flex flex-col items-center justify-center">
            {/* Live Label */}
            {isLive ? ( <>
                <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500 animate-smooth-pulse" />
                    <p className="text-sm text-green-500 font-semibold">Live</p>
                </div>
                
                {/* Temperature Display */}
                <div className="text-center">
                    <p className="text-xl text-gray-400">Temperature</p>
                </div>
        </>
            ) : (
                <div className="flex flex-col items-center gap-1 mt-4">
                    <p className="text-sm text-gray-500 font-semibold">Last recorded:</p>
                    <p className="text-lg text-green-600 font-bold">
                        {latestData?.recorded_at ? latestData.recorded_at.toLocaleString() : "No data"}
                    </p>
                </div>
            )}
            
            <div className="text-center">
                <p className={`text-6xl font-bold mt-2 ${isLive ? "text-orange-400" : "text-gray-400"}`}>{latestData?.temp.toFixed(2) ?? 'N/A'}°C</p>
            </div>
            
            {/* Temperature Info */}
            <div className="text-gray-500 text-center mt-2">
                <p>Coverage: <span className={`font-bold ${isLive ? "text-green-600" : "text-gray-400"}`}>{`${latestData?.coverage}%` ?? 'N/A'}</span></p>
            </div>
        </div>
    );
}

export default LiveTempCard;


