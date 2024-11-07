import React, { useEffect, useState } from 'react';
import TempChartCard from './TempChartCard';
import TempTableCard from './TempTableCard';
import ChartPlaceHolder from './ChartPlaceHolder';
import TablePlaceHolder from './TablePlaceHolder';

function TempDataDisplay() {
    const [initialData, setInitialData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('today');

    const apiEndpoint = `${process.env.REACT_APP_API_BASE}/temperature?${
        filter === 'today' ? 'pastDay=true' : 'pastWeek=true'
    }`;

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(apiEndpoint);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            const formattedData = data.map(entry => ({
                time: new Date(entry.recorded_at).getTime(),
                temp: entry.val,
                coverage: entry.coverage,
            }));
            setInitialData(formattedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [filter]);

    const handleFilterChange = (newFilter) => {
        if (newFilter !== filter) {
            setFilter(newFilter);
        }
    };

    return (
        <div className="w-full h-full p-4 space-y-4">
            {/* Filter Options */}
            <div className="flex justify-end mb-4">
                <button
                    className={`px-4 py-2 mx-2 rounded ${filter === 'today' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    onClick={() => handleFilterChange('today')}
                >
                    Today
                </button>
                <button
                    className={`px-4 py-2 mx-2 rounded ${filter === 'pastWeek' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    onClick={() => handleFilterChange('pastWeek')}
                >
                    Past Week
                </button>
            </div>

            {/* Data Display (Show Skeleton if Loading) */}
            <div className="flex flex-col lg:flex-row w-full h-[70vh] gap-6">
                {loading ? (
                    // Skeleton Loading Boxes
                    <>
                        <div className="w-full lg:w-2/3 h-full">
                            <ChartPlaceHolder />
                        </div>
                        <div className="w-full lg:w-1/3 h-full">
                            <TablePlaceHolder />
                        </div>
                    </>
                ) : (
                    <>
                        {/* Chart Card with 60% width on large screens */}
                        <div className="w-full lg:w-2/3 h-full">
                            <TempChartCard initialData={initialData} />
                        </div>
                        {/* Table Card with 40% width on large screens */}
                        <div className="w-full lg:w-1/3 h-full">
                            <TempTableCard initialData={initialData} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default TempDataDisplay;


