import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useAnimatedData } from './useAnimatedData';

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

function TempChartCard({initialData}) {
    const maxValue = Math.max(...initialData.map(d => d.temp));
    const calculatedMax = Math.ceil(maxValue / 5) * 5;
    const processedData = initialData.map((item) => ({
        ...item,
        coverage_val: item.temp * (item.coverage / 100), 
    }));

    const data = useAnimatedData(processedData, 400);
    const [fillOpacity, setFillOpacity] = useState(0);
    const hourlyTicks = generateHourlyTicks(initialData);

    const averageTemp = (initialData.reduce((sum, item) => sum + item.temp, 0) / initialData.length).toFixed(2);
    const accuracy = (initialData.reduce((sum, item) => sum + item.coverage, 0) / initialData.length).toFixed(2);
    const maxTemp = (initialData.reduce((max, item) => (item.temp > max ? item.temp : max), -Infinity)).toFixed(2);
    const minTemp = (initialData.reduce((min, item) => (item.temp < min ? item.temp : min), Infinity)).toFixed(2);  

    useEffect(() => {
        const fillDelay = 1000;
        const increment = 0.05;
        const intervalTime = 25;
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
        <div className="bg-white rounded-lg shadow-lg p-8 w-full overflow-hidden h-[60vh] mx-auto" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            {/* Sidebar Information */}
            <div className="text-gray-400 lg:w-1/4 flex flex-col flex-wrap max-w-full break-words">
                <div className="ml-6">
                    <p className="text-2xl lg:text-4xl text-grey-400">Avg</p>
                    <p className="text-4xl lg:text-7xl text-orange-300 font-bold">{averageTemp}C</p>
                    <p className="text-lg lg:text-2xl text-gray-400 mt-2">Accuracy</p>
                    <p className="text-2xl lg:text-4xl text-green-300 font-bold">{accuracy}%</p>
                </div>
                <div className = "ml-6 mt-6">
                    <p className="text-sm lg:text-base ">Logging Interval: <span  className ="text-green-600 font-bold">10 mins</span></p>
                    <p className="text-sm lg:text-base ">Sampling Interval: <span  className ="text-green-600 font-bold">10 secs</span></p>
                    <p className="text-sm lg:text-base ">Peak Temp: <span  className ="text-orange-300 font-bold">{maxTemp}C</span></p>
                    <p className="text-sm lg:text-base ">Lowest Temp: <span  className ="text-blue-300 font-bold">{minTemp}C</span></p>
                </div>

            </div>

            {/* Chart */}
            <div className="w-4/5 h-full ml-2">
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
                                offset: 18, 
                                dy: 60,
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




