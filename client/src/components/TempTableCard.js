import React from 'react';

function TempTableCard({ initialData }) {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6 w-1/2 h-[50vh] mx-auto overflow-hidden">
            {/* Title with Margin Bottom */}
            <h2 className="text-xl font-semibold text-gray-500 mb-2">Data Points</h2>
            
            {/* Scrollable Table Container */}
            <div className="h-[calc(100%-2.5rem)] overflow-y-auto">
                <table className="min-w-full bg-white border-collapse">
                    <thead className="sticky top-0 bg-gray-200 border-b">
                        <tr>
                            <th className="py-2 px-2 text-left text-gray-500 font-semibold">Date</th>
                            <th className="py-2 px-2 text-left text-gray-500 font-semibold">Time</th>
                            <th className="py-2 px-2 text-left text-gray-500 font-semibold">Temperature (C)</th>
                            <th className="py-2 px-2 text-left text-gray-500 font-semibold">Coverage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {initialData.map((item, index) => (
                            <tr key={index} className="border-b">
                                <td className="py-2 px-2 text-gray-500">{new Date(item.time).toLocaleDateString()}</td>
                                <td className="py-2 px-2 text-green-700">{new Date(item.time).toLocaleTimeString()}</td>
                                <td className="py-2 px-2 text-orange-500">{item.temp}</td>
                                <td className="py-2 px-2 text-gray-500">{item.coverage}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TempTableCard;





