import React from 'react';

const SideBar = ({ lights, highlightedLight, setHighlightedLight, isLive=false}) => {
  return (
    <div className="w-[50vh] h-[70vh] bg-gray-200 p-4 rounded-2xl shadow-lg overflow-auto">
      {/* Title with the indicator */}
      <div className="flex items-center mb-4 space-x-3">
        <h2 className="text-lg font-semibold text-gray-700">Light Status</h2>
        <div
          className={`px-4 rounded-full font-bold tracking-wide text-center border ${
            isLive
              ? 'text-green-500 bg-green-200 animate-pulse'
              : 'text-gray-400 bg-gray-300'
          }`}
        >
          {isLive ? 'ONLINE' : 'OFFLINE'}
        </div>
      </div>

      {/* List of lights */}
      <ul>
        {lights.map((light, index) => (
          <li
            key={index}
            className={`flex justify-between items-center mb-2 p-2 bg-white rounded-md shadow-sm cursor-pointer ${
              highlightedLight === light.name || highlightedLight === null
                ? 'opacity-100'
                : 'opacity-50'
            }`}
            onMouseEnter={() => setHighlightedLight(light.name)}
            onMouseLeave={() => setHighlightedLight(null)}
          >
            <span className="text-gray-800 font-medium">{light.name}</span>
            <span
              className={`font-semibold ${
                light.isOn ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {light.isOn ? 'On' : 'Off'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;


