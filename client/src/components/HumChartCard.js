import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useAnimatedData } from './useAnimatedData';

const initialData = [
    { time: new Date('2024-11-03T07:00').getTime(), hum: 20 },
    { time: new Date('2024-11-03T07:30').getTime(), hum: 22 },
    { time: new Date('2024-11-03T08:00').getTime(), hum: 24 },
    { time: new Date('2024-11-03T08:30').getTime(), hum: 26 },
    { time: new Date('2024-11-03T09:00').getTime(), hum: 30 },
    { time: new Date('2024-11-03T09:30').getTime(), hum: 32 },
    { time: new Date('2024-11-03T10:00').getTime(), hum: 35 },
    { time: new Date('2024-11-03T10:30').getTime(), hum: 37 },
    { time: new Date('2024-11-03T11:00').getTime(), hum: 35 },
    { time: new Date('2024-11-03T11:30').getTime(), hum: 38 },
    { time: new Date('2024-11-03T12:00').getTime(), hum: 40 },
    { time: new Date('2024-11-03T12:30').getTime(), hum: 42 },
    { time: new Date('2024-11-03T13:00').getTime(), hum: 50 },
    { time: new Date('2024-11-03T13:30').getTime(), hum: 55 },
    { time: new Date('2024-11-03T14:00').getTime(), hum: 58 },
    { time: new Date('2024-11-03T14:30').getTime(), hum: 60 },
    { time: new Date('2024-11-03T15:00').getTime(), hum: 60 },
    { time: new Date('2024-11-03T15:30').getTime(), hum: 65 },
    { time: new Date('2024-11-03T16:00').getTime(), hum: 63 },
    { time: new Date('2024-11-03T16:30').getTime(), hum: 66 },
    { time: new Date('2024-11-03T17:00').getTime(), hum: 68 },
    { time: new Date('2024-11-03T17:30').getTime(), hum: 70 },
    { time: new Date('2024-11-03T18:00').getTime(), hum: 72 },
    { time: new Date('2024-11-03T18:30').getTime(), hum: 74 },
    { time: new Date('2024-11-03T19:00').getTime(), hum: 75 },
    { time: new Date('2024-11-03T19:30').getTime(), hum: 73 },
    { time: new Date('2024-11-03T20:00').getTime(), hum: 71 },
    { time: new Date('2024-11-03T20:30').getTime(), hum: 70 },
    { time: new Date('2024-11-03T21:00').getTime(), hum: 68 },
    { time: new Date('2024-11-03T21:15').getTime(), hum: 68 },
    { time: new Date('2024-11-03T21:30').getTime(), hum: 66 },
    { time: new Date('2024-11-03T22:00').getTime(), hum: 65 },
];


const maxValue = Math.max(...initialData.map(d => d.hum));

// Format timestamps to display as "HH:MM"
const timeFormatter = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
};

// Generate hourly ticks for the grid
const generateHourlyTicks = (data) => {
    const minTime = Math.min(...data.map(d => d.time));
    const maxTime = Math.max(...data.map(d => d.time));
    const ticks = [];

    for (let time = minTime; time <= maxTime; time += 60 * 60 * 1000) { // Increment by 1 hour in milliseconds
        ticks.push(time);
    }

    return ticks;
};

function HumChartCard() {
    const data = useAnimatedData(initialData, 800);
    const [fillOpacity, setFillOpacity] = useState(0);
    const hourlyTicks = generateHourlyTicks(initialData);

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
        <div className="bg-white rounded-lg shadow-lg p-8 w-full" style={{ height: '60vh', maxWidth: '100vw' }}>
            <div style={{ height: '100%', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" /> {/* Grid background */}
                        <XAxis
                            dataKey="time"
                            type="number"
                            domain={['dataMin', 'dataMax']}
                            ticks={hourlyTicks} // Set hourly ticks for grid
                            tickFormatter={(tick) => {
                                const hour = new Date(tick).getHours();
                                // Only show label for even hours (every 2 hours)
                                return hour % 2 === 0 ? timeFormatter(tick) : '';
                            }}
                        />
                        <YAxis domain={[0, maxValue]} />
                        <Tooltip labelFormatter={timeFormatter} />
                        <Legend verticalAlign="bottom" height={30} wrapperStyle={{ paddingTop: 10 }} />

                        {/* Temperature Area with Dots */}
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

export default HumChartCard;