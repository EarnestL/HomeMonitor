import React, { useEffect, useState } from 'react';
import TempDataDisplay from '../components/TempDataDisplay';
import LoadingDots from '../components/LoadingDots';

function TempPage() {
    const [initialData, setInitialData] = useState([]);
    const [loading, setLoading] = useState(false);

    return (
        <div className="h-screen overflow-y-auto w-full flex flex-col items-center">
            {loading ? (
                <div className="h-screen w-full flex items-center justify-center">
                    <LoadingDots />
                </div>
            ) : (
                <section className="w-full px-20 space-y-8 mt-20 mb-8">
                    <TempDataDisplay initialData={initialData}/>
                </section>
            )}
        </div>
    );
}

export default TempPage;



