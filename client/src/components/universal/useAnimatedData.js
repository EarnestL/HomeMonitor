import { useState, useEffect } from 'react';

export const useAnimatedData = (initialData, duration = 1000) => {
    // Initialize animated data with the same structure, but with all numeric values set to 0
    const [animatedData, setAnimatedData] = useState(
        initialData.map((point) => {
            const initialPoint = { time: point.time }; // Keep time as-is
            Object.keys(point).forEach((key) => {
                if (typeof point[key] === 'number' && key !== 'time') {
                    initialPoint[key] = 0; // Initialize numeric fields to 0
                } else if (key !== 'time') {
                    initialPoint[key] = point[key]; // Copy other fields as-is
                }
            });
            return initialPoint;
        })
    );

    useEffect(() => {
        const intervalTime = 5; // Shorter interval for faster updates
        const steps = duration / intervalTime;

        // Calculate the increment for each numeric field in each data point
        const incrementData = initialData.map((point) => {
            const increments = { time: point.time };
            Object.keys(point).forEach((key) => {
                if (typeof point[key] === 'number' && key !== 'time') {
                    increments[key + 'Increment'] = point[key] / steps;
                }
            });
            return increments;
        });

        let currentStep = 0;
        const interval = setInterval(() => {
            if (currentStep >= steps) {
                clearInterval(interval);
                setAnimatedData(initialData); // Set final data
            } else {
                setAnimatedData((prevData) =>
                    prevData.map((point, index) => {
                        const newPoint = { ...point, time: point.time };
                        Object.keys(point).forEach((key) => {
                            if (typeof point[key] === 'number' && key !== 'time') {
                                newPoint[key] = Math.min(
                                    point[key] + incrementData[index][key + 'Increment'],
                                    initialData[index][key]
                                );
                            }
                        });
                        return newPoint;
                    })
                );
                currentStep++;
            }
        }, intervalTime);

        return () => clearInterval(interval);
    }, [initialData, duration]);

    return animatedData;
};




