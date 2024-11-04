import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAnimatedData } from './useAnimatedData';

const initialData = [
    { time: '07:00', temp: 30, hum: 20 },
    { time: '09:00', temp: 40, hum: 30 },
    { time: '11:00', temp: 50, hum: 35 },
    { time: '13:00', temp: 80, hum: 50 },
    { time: '15:00', temp: 100, hum: 60 },
];

const maxValue = Math.max(...initialData.map(d => Math.max(d.temp, d.hum)));

function AmbienceWidget() {
    const data = useAnimatedData(initialData, 800);
    const [fillOpacity, setFillOpacity] = useState(0);

    useEffect(() => {
        const fillDelay = 1000;
        const increment = 0.05;
        const intervalTime = 50;
        const targetOpacity = 0.3;

        const timer = setTimeout(() => {
            const interval = setInterval(() => {
                setFillOpacity((prev) => {
                    if (prev + increment >= targetOpacity) {
                        clearInterval(interval);
                        return targetOpacity;
                    }
                    return prev + increment;
                });
            }, intervalTime);
        }, fillDelay);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className="bg-white rounded-lg shadow-lg w-72 h-64 flex flex-col items-center justify-between border border-gray-200">
            {/* Title */}
            <h2 className="text-sm text-gray-700 mt-4">
                Temperature & Humidity Trend
            </h2>
            <h2 className="text-sm text-blue-800 font-bold">
                11-03-2024
            </h2>

            {/* Chart */}
            <div className="w-full h-full flex justify-center items-center">
                <ResponsiveContainer width="95%" height="75%" style={{ marginLeft: '-10%' }}>
                    <AreaChart data={data}>
                        <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                        <YAxis domain={[0, maxValue]} tick={{ fontSize: 10 }} />
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={20} wrapperStyle={{ fontSize: 10 }} />

                        <Area
                            type="monotone"
                            dataKey="temp"
                            stroke="#FFB38A"
                            fill="#FFDBBB"
                            fillOpacity={fillOpacity}
                            name="Temperature"
                        />
                        <Area
                            type="monotone"
                            dataKey="hum"
                            stroke="#0096FF"
                            fill="#89CFF0"
                            fillOpacity={fillOpacity}
                            name="Humidity"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default AmbienceWidget;





