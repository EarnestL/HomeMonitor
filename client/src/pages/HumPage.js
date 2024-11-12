import React, { useEffect, useState } from 'react';
import HumDataDisplay from '../components/humidity/HumDataDisplay';
import LoadingDots from '../components/LoadingDots';
import LiveHumCard from '../components/humidity/LiveHumCard';
import HumZScoreCard from '../components/humidity/HumZScoreCard';

function HumPage() {
    const [initialData, setInitialData] = useState([]);
    const [loading, setLoading] = useState(false);

    return (
        <div className="h-screen overflow-y-auto w-full flex flex-col items-center">
            {loading ? (
                <div className="h-screen w-full flex items-center justify-center">
                    <LoadingDots />
                </div>
            ) : (
                <>
                    <section className="w-full px-20 space-y-8 mt-20">
                        <HumDataDisplay initialData={initialData} />
                    </section>
                    <section className="w-full flex flex-col lg:flex-row mt-7 mb-10 px-20 gap-6">
                        {/* Limit the height of LiveHumCard */}
                        <div className="w-full lg:w-1/4 h-[350px]">
                            <LiveHumCard />
                        </div>
                        {/* Limit the height of ZScoreDisplay */}
                        <div className="w-full lg:w-3/4 h-[350px]">
                            <HumZScoreCard />
                        </div>
                    </section>
                </>
            )}
        </div>
    );
}

export default HumPage;
