import React, { useEffect, useState } from 'react';
import ZScoreDisplayCard from '../universal/ZScoreDisplay';

function TempZScoreCard() {
    const [dataPoints, setDataPoints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE}/temperature/z-score`);
                const data = await response.json();
                
                // Extract "val" from each object in the list
                const values = data.map(item => item.val);
                setDataPoints(values);
            } catch (error) {
                console.error('Error fetching temperature z-score data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-lg p-6 w-full h-full flex flex-col justify-center items-center gap-6">
                <p className="text-gray-400 text-2xl lg:text-4xl">Loading...</p>
            </div>
        );
    }

    if (dataPoints.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-lg p-6 w-full h-full flex flex-col justify-center items-center gap-6">
                <p className="text-gray-400 text-2xl lg:text-4xl">No Data Available</p>
            </div>
        );
    }

    // Use the latest value in the list for the `currentValue` parameter
    const currentValue = dataPoints[dataPoints.length - 1];

    return (
        <ZScoreDisplayCard dataPoints={dataPoints} currentValue={currentValue} />
    );
}

export default TempZScoreCard;
