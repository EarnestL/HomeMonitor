import React, { useEffect, useState } from 'react';
import TempDataDisplay from '../components/temperature/TempDataDisplay';
import LoadingDots from '../components/LoadingDots';
import LiveTempCard from '../components/temperature/LiveTempCard';
import TempZScoreCard from '../components/temperature/TempZScoreCard';

function TempPage() {
    const [initialData, setInitialData] = useState([]);
    const [loading, setLoading] = useState(false);

    const dataPoints = [50, 55, 60, 53, 58, 62, 57, 59, 56, 54];
    
    // Test current value for which to calculate the Z-score
    const currentValue = 65; // You can adjust this to test different values

    return (
        <div className="h-screen overflow-y-auto w-full flex flex-col items-center">
            {loading ? (
                <div className="h-screen w-full flex items-center justify-center">
                    <LoadingDots />
                </div>
            ) : (
                <>
                    <section className="w-full px-20 space-y-8 mt-20">
                        <TempDataDisplay initialData={initialData} />
                    </section>
                    <section className="w-full flex flex-col lg:flex-row mt-7 mb-10 px-20 gap-6">
                        {/* Limit the height of LiveTempCard */}
                        <div className="w-full lg:w-1/4 h-[350px]">
                            <LiveTempCard />
                        </div>
                        {/* Limit the height of ZScoreDisplay */}
                        <div className="w-full lg:w-3/4 h-[350px]">
                            <TempZScoreCard />
                        </div>
                    </section>
                </>
            )}
        </div>
    );
}

export default TempPage;





