import React from 'react';
import MinimalChart from '../components/MinimalChart';

const sampleData = [
    { time: '07:00', value: 30 },
    { time: '09:00', value: 40 },
    { time: '11:00', value: 50 },
    { time: '13:00', value: 80 },
    { time: '15:00', value: 100 },
];

function ExamplePage() {
    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <MinimalChart
                title="Traffic Trend"
                data={sampleData}
                xAxisKey="time"
                dataKey="value"
                color="#4A90E2"  // Subtle blue color
            />
        </div>
    );
}

export default ExamplePage;

