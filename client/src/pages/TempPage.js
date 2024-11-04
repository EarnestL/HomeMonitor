import React from 'react';
import TempChartCard from '../components/TempChartCard';

function TempPage() {
    return (
        <div className="w-full flex flex-col items-start">

            {/* Area Chart Card Section with additional padding around each card */}
            <section className="mt-8 w-full px-20 space-y-8"> {/* Added space-y-8 for vertical spacing */}
                <div className="p-4"> {/* Padding around TempChartCard */}
                    <TempChartCard />
                </div>
            </section>
        </div>
    );
}

export default TempPage;

