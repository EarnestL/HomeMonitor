import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useAnimatedData } from './useAnimatedData';

const initialData = [
    { time: new Date('2024-11-03T07:00').getTime(), temp: 1.1, coverage: 100 },
    { time: new Date('2024-11-03T07:30').getTime(), temp: 0, coverage: 95 },
    { time: new Date('2024-11-03T08:00').getTime(), temp: 1.7, coverage: 92 },
    { time: new Date('2024-11-03T08:30').getTime(), temp: 3.3, coverage: 88 },
    { time: new Date('2024-11-03T09:00').getTime(), temp: 4.4, coverage: 85 },
    { time: new Date('2024-11-03T09:30').getTime(), temp: 5.6, coverage: 80 },
    { time: new Date('2024-11-03T10:00').getTime(), temp: 7.2, coverage: 78 },
    { time: new Date('2024-11-03T10:30').getTime(), temp: 8.3, coverage: 85 },
    { time: new Date('2024-11-03T11:00').getTime(), temp: 10, coverage: 90 },
    { time: new Date('2024-11-03T11:30').getTime(), temp: 12.8, coverage: 93 },
    { time: new Date('2024-11-03T12:00').getTime(), temp: 15.6, coverage: 95 },
    { time: new Date('2024-11-03T12:30').getTime(), temp: 16.7, coverage: 97 },
    { time: new Date('2024-11-03T13:00').getTime(), temp: 26.7, coverage: 98 },
    { time: new Date('2024-11-03T13:30').getTime(), temp: 23.9, coverage: 90 },
    { time: new Date('2024-11-03T14:00').getTime(), temp: 25.6, coverage: 88 },
    { time: new Date('2024-11-03T14:30').getTime(), temp: 27.8, coverage: 85 },
    { time: new Date('2024-11-03T15:00').getTime(), temp: 37.8, coverage: 80 },
    { time: new Date('2024-11-03T15:30').getTime(), temp: 35, coverage: 75 },
    { time: new Date('2024-11-03T16:00').getTime(), temp: 32.2, coverage: 78 },
    { time: new Date('2024-11-03T16:30').getTime(), temp: 31.1, coverage: 82 },
    { time: new Date('2024-11-03T17:00').getTime(), temp: 29.4, coverage: 85 },
    { time: new Date('2024-11-03T17:30').getTime(), temp: 27.8, coverage: 87 },
    { time: new Date('2024-11-03T18:00').getTime(), temp: 26.7, coverage: 90 },
    { time: new Date('2024-11-03T18:30').getTime(), temp: 25.6, coverage: 92 },
    { time: new Date('2024-11-03T19:00').getTime(), temp: 24.4, coverage: 94 },
    { time: new Date('2024-11-03T19:30').getTime(), temp: 23.3, coverage: 96 },
    { time: new Date('2024-11-03T20:00').getTime(), temp: 21.1, coverage: 98 },
    { time: new Date('2024-11-03T20:30').getTime(), temp: 20, coverage: 97 },
    { time: new Date('2024-11-03T21:00').getTime(), temp: 18.3, coverage: 95 },
    { time: new Date('2024-11-03T21:15').getTime(), temp: 18.3, coverage: 90 },
    { time: new Date('2024-11-03T21:30').getTime(), temp: 16.7, coverage: 85 },
    { time: new Date('2024-11-03T22:00').getTime(), temp: 15.6, coverage: 80 },
];

const maxValue = Math.max(...initialData.map(d => d.temp));
const calculatedMax = Math.ceil(maxValue / 5) * 5;

const timeFormatter = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
};

const generateHourlyTicks = (data) => {
    const minTime = Math.min(...data.map(d => d.time));
    const maxTime = Math.max(...data.map(d => d.time));
    const ticks = [];

    for (let time = minTime; time <= maxTime; time += 60 * 60 * 1000) {
        ticks.push(time);
    }

    return ticks;
};

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const temperatureData = payload.find((entry) => entry.dataKey === 'temp');
        if (temperatureData) {
            return (
                <div className="custom-tooltip" style={{ backgroundColor: 'grey', padding: '5px', border: '1px solid #ccc' }}>
                    <p>{`Time: ${timeFormatter(label)} PST`}</p>
                    <p>{`Temperature: ${temperatureData.value}°C`}</p>
                </div>
            );
        }
    }
    return null;
};

function TempChartCard() {
    const processedData = initialData.map((item) => ({
        ...item,
        coverage_val: item.temp * (item.coverage / 100), 
    }));

    const data = useAnimatedData(processedData, 800);
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
        <div className="bg-white rounded-lg shadow-lg p-8 w-full overflow-hidden" style={{ height: '60vh', maxWidth: '100vw', display: 'flex', gap: '20px', alignItems: 'center' }}>
            {/* Sidebar Information */}
            <div className="text-gray-400 lg:w-1/4 flex flex-col flex-wrap max-w-full break-words">
                <div className="ml-6">
                    <p className="text-2xl lg:text-4xl text-grey-400">Avg</p>
                    <p className="text-4xl lg:text-7xl text-orange-300 font-bold">12.67C</p>
                    <p className="text-lg lg:text-2xl text-gray-400 mt-2">Accuracy</p>
                    <p className="text-2xl lg:text-4xl text-green-300 font-bold">83%</p>
                </div>
                <div className = "ml-6 mt-6">
                    <p className="text-sm lg:text-base ">Logging Interval: <span  className ="text-green-300 font-bold">10 mins</span></p>
                    <p className="text-sm lg:text-base ">Sampling Interval: <span  className ="text-green-300 font-bold">10 secs</span></p>
                    <p className="text-sm lg:text-base ">Peak Temp: <span  className ="text-orange-300 font-bold">37.8C</span></p>
                    <p className="text-sm lg:text-base ">Lowest Temp: <span  className ="text-blue-300 font-bold">0.0C</span></p>
                </div>

            </div>

            {/* Chart */}
            <div className="w-4/5 h-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="time"
                            type="number"
                            domain={['dataMin', 'dataMax']}
                            ticks={hourlyTicks}
                            tickFormatter={(tick) => {
                                const hour = new Date(tick).getHours();
                                return hour % 2 === 0 ? timeFormatter(tick) : '';
                            }}
                            tick={{ fontSize: 20, fontFamily: 'monospace', fill: '#7EC481' }}
                        />
                        <YAxis 
                            domain={[0, calculatedMax]} 
                            tickCount={calculatedMax / 5 + 1} 
                            interval={0} 
                            label={{ 
                                value: "Temperature (C)", 
                                angle: -90, 
                                position: "insideLeft", 
                                offset: 5, 
                                dy: 40,
                                style: { fontSize: '20px', fontFamily: 'monospace'} }}
                            fill= "#FFB38A"  // Set the color of the label text
                            tick={{ fontSize: 18, fontFamily: 'monospace'}} // Tailwind-inspired font properties
                        />
                        <Tooltip content={<CustomTooltip />} />

                        {/* Temperature Area */}
                        <Area
                            type="monotone"
                            dataKey="temp"
                            stroke="#FFB38A"
                            fill="#FFDBBB"
                            fillOpacity={fillOpacity}
                            name="Temperature"
                            strokeWidth={2}
                        />

                        {/* Coverage Area without tooltip interaction */}
                        <Area
                            type="monotone"
                            dataKey="coverage_val"
                            stroke="#FFDBBB"
                            fill="#FFDBBB"
                            fillOpacity={0.3}
                            isAnimationActive={false}
                            connectNulls
                            strokeWidth={0}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default TempChartCard;




