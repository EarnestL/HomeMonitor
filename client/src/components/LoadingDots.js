import React from 'react';

const LoadingDots = () => {
    return (
        <div className="flex space-x-2">
            <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce-1"></div>
            <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce-2"></div>
            <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce-3"></div>
        </div>
    );
};

export default LoadingDots;







