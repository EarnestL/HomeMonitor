import React from 'react';
import LoadingDots from './LoadingDots'

function ChartPlaceHolder() {

    return (
        <div className="bg-white animate-pulse rounded-lg shadow-lg p-8 w-full overflow-hidden h-[60vh] mx-auto flex items-center justify-center" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <LoadingDots />
        </div>
    );
}

export default ChartPlaceHolder;