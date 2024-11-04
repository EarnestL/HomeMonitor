import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useAnimatedData } from './useAnimatedData';

const initialData = [
    { time: new Date('2024-11-03T07:00').getTime(), temp: -1.1, hum: 20 },
    { time: new Date('2024-11-03T07:30').getTime(), temp: 0, hum: 22 },
    { time: new Date('2024-11-03T08:00').getTime(), temp: 1.7, hum: 24 },
    { time: new Date('2024-11-03T08:30').getTime(), temp: 3.3, hum: 26 },
    { time: new Date('2024-11-03T09:00').getTime(), temp: 4.4, hum: 30 },
    { time: new Date('2024-11-03T09:30').getTime(), temp: 5.6, hum: 32 },
    { time: new Date('2024-11-03T10:00').getTime(), temp: 7.2, hum: 35 },
    { time: new Date('2024-11-03T10:30').getTime(), temp: 8.3, hum: 37 },
    { time: new Date('2024-11-03T11:00').getTime(), temp: 10, hum: 35 },
    { time: new Date('2024-11-03T11:30').getTime(), temp: 12.8, hum: 38 },
    { time: new Date('2024-11-03T12:00').getTime(), temp: 15.6, hum: 40 },
    { time: new Date('2024-11-03T12:30').getTime(), temp: 16.7, hum: 42 },
    { time: new Date('2024-11-03T13:00').getTime(), temp: 26.7, hum: 50 },
    { time: new Date('2024-11-03T13:30').getTime(), temp: 23.9, hum: 55 },
    { time: new Date('2024-11-03T14:00').getTime(), temp: 25.6, hum: 58 },
    { time: new Date('2024-11-03T14:30').getTime(), temp: 27.8, hum: 60 },
    { time: new Date('2024-11-03T15:00').getTime(), temp: 37.8, hum: 60 },
    { time: new Date('2024-11-03T15:30').getTime(), temp: 35, hum: 65 },
    { time: new Date('2024-11-03T16:00').getTime(), temp: 32.2, hum: 63 },
    { time: new Date('2024-11-03T16:30').getTime(), temp: 31.1, hum: 66 },
    { time: new Date('2024-11-03T17:00').getTime(), temp: 29.4, hum: 68 },
    { time: new Date('2024-11-03T17:30').getTime(), temp: 27.8, hum: 70 },
    { time: new Date('2024-11-03T18:00').getTime(), temp: 26.7, hum: 72 },
    { time: new Date('2024-11-03T18:30').getTime(), temp: 25.6, hum: 74 },
    { time: new Date('2024-11-03T19:00').getTime(), temp: 24.4, hum: 75 },
    { time: new Date('2024-11-03T19:30').getTime(), temp: 23.3, hum: 73 },
    { time: new Date('2024-11-03T20:00').getTime(), temp: 21.1, hum: 71 },
    { time: new Date('2024-11-03T20:30').getTime(), temp: 20, hum: 70 },
    { time: new Date('2024-11-03T21:00').getTime(), temp: 18.3, hum: 68 },
    { time: new Date('2024-11-03T21:15').getTime(), temp: 18.3, hum: 68 },
    { time: new Date('2024-11-03T21:30').getTime(), temp: 16.7, hum: 66 },
    { time: new Date('2024-11-03T22:00').getTime(), temp: 15.6, hum: 65 },
];



const maxValue = Math.max(...initialData.map(d => Math.max(d.temp, d.hum)));

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

function AreaChartCard() {
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
                            dataKey="temp"
                            stroke="#FFB38A"
                            fill="#FFDBBB"
                            fillOpacity={fillOpacity}
                            name="Temperature"
                        />

                        {/* Humidity Area with Dots */}
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

export default AreaChartCard;































