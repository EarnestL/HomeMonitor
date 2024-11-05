import React, {useEffect, useState} from 'react';
import TempChartCard from '../components/TempChartCard';

function TempPage() {

    const [initialData, setInitialData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Replace this with the actual API endpoint
    const apiEndpoint = `${process.env.REACT_APP_API_BASE}/temperature`;


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(apiEndpoint);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                
                const formattedData = data.map(entry => ({
                    time: new Date(entry.recorded_at).getTime(),
                    temp: entry.val,
                    coverage: entry.coverage
                }));

                setInitialData(formattedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="h-screen overflow-y-auto mt-20 w-full flex flex-col items-start">
            {loading ? (
                <p>loading...</p>
            ) : (
                <section className="w-full px-20 space-y-8"> {/* Added space-y-8 for vertical spacing */}
                    <div className="p-4"> {/* Padding around TempChartCard */}
                        <TempChartCard initialData={initialData} />
                    </div>
                </section>
            )}

        </div>

    );
}

export default TempPage;


