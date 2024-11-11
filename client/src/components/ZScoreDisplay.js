import React, { useState } from 'react';

function ZScoreDisplayCard({ dataPoints, currentValue }) {
    // Calculate mean
    const mean = dataPoints.reduce((sum, value) => sum + value, 0) / dataPoints.length;

    // Calculate standard deviation
    const variance = dataPoints.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / dataPoints.length;
    const standardDeviation = Math.sqrt(variance);

    // Calculate the Z-score of the current value
    const zScore = (currentValue - mean) / standardDeviation;

    // Define the range and visual scale properties
    const minRange = mean - 3 * standardDeviation;
    const maxRange = mean + 3 * standardDeviation;

    // Calculate indicator position for the current value
    const indicatorPosition = Math.min(
        Math.max(((currentValue - minRange) / (maxRange - minRange)) * 100, 0),
        100
    );

    // Tooltip state
    const [tooltip, setTooltip] = useState({ visible: false, x: 0, actualValue: 0 });

    // Show tooltip with the actual value for the hovered position
    const handleMouseMove = (e) => {
        const barRect = e.currentTarget.getBoundingClientRect();
        const mouseX = e.clientX - barRect.left; // Position of mouse relative to the bar
        const actualValue = minRange + (mouseX / barRect.width) * (maxRange - minRange); // Map mouse position to actual value

        setTooltip({
            visible: true,
            x: mouseX,
            actualValue: actualValue.toFixed(2),
        });
    };

    // Hide the tooltip when the mouse leaves
    const handleMouseLeave = () => {
        setTooltip({ ...tooltip, visible: false });
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 w-full h-full flex flex-col justify-center items-center gap-6">
            {/* Display Z-score of Current Value */}
            <div className="text-gray-400 w-full text-center">
                <p className="text-2xl lg:text-4xl">Z-Score</p>
                <p className="text-4xl lg:text-7xl text-orange-300 font-bold">{zScore.toFixed(2)}</p>
            </div>

            {/* Minimalistic Gradient Bar */}
            <div
                className="relative w-full h-2 mt-4 rounded-full flex items-center"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    background: "linear-gradient(to right, #FFC1C1, #DFF2D8, #FFC1C1)",
                }}
            >
                {/* Tooltip */}
                {tooltip.visible && (
                    <div
                        className="absolute bottom-8 transform -translate-x-1/2 p-1 bg-gray-700 text-white text-xs rounded shadow-lg"
                        style={{ left: `${tooltip.x}px` }}
                    >
                        {tooltip.actualValue}
                    </div>
                )}

                {/* Minimalistic Indicator Line */}
                <div
                    className="absolute w-1 h-6 bg-blue-500 rounded-full"
                    style={{ 
                        left: `${indicatorPosition}%`, 
                        transform: "translateX(-50%)", 
                        top: "-8px"
                    }}
/>
            </div>

            {/* Interpretation of Mean and Standard Deviation */}
            <div className="text-gray-500 text-center">
                <p>Mean: <span className="text-green-600 font-bold">{mean.toFixed(2)}</span></p>
                <p>Standard Deviation: <span className="text-green-600 font-bold">{standardDeviation.toFixed(2)}</span></p>
                <p>Current Value: <span className="text-orange-400 font-bold">{currentValue}</span></p>
            </div>
        </div>
    );
}

export default ZScoreDisplayCard;









