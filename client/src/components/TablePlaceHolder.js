import React from 'react';
import LoadingDots from './LoadingDots'

function TablePlaceHolder() {
    return (
        <div className="bg-white rounded-lg animate-pulse shadow-lg p-6 h-[60vh] mx-auto overflow-hidden flex items-center justify-center">
            <LoadingDots/>
        </div>
    );
}

export default TablePlaceHolder;