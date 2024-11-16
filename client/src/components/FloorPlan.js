import React from 'react';
import floorPlan from '../assets/floorplan.png';
import lamp1 from '../assets/lamp1.png';
import lamp2 from '../assets/lamp2.png';
import lamp3 from '../assets/lamp3.png';
import lamp1Select from '../assets/lamp1Select.png';
import lamp2Select from '../assets/lamp2Select.png';
import lamp3Select from '../assets/lamp3Select.png';

const FloorPlan = ({ lights, highlightedLight, setHighlightedLight }) => {
  let isNight = true;
  return (
    <div className="flex justify-center items-center bg-gray-100">
      {/* Static Border Container */}
      <div className="h-[70vh] aspect-[5/3] bg-gray-200 rounded-2xl shadow-lg overflow-hidden p-1 flex items-center justify-center">
        {/* Inner Content with White Background */}
        <div className={`relative w-full h-full rounded-xl overflow-hidden shadow-inner ${isNight ? 'bg-gray-600' : 'bg-white'}`}>
          {/* Floor Plan Image */}
          <img
            src={floorPlan}
            alt="Floor Plan"
            className={`absolute inset-0 w-full h-full object-contain rounded-xl transition-opacity duration-300 ${
              highlightedLight != null ? 'opacity-20' : 'opacity-100'
            }`}
          />
          {/* Lamp 1 */}
          <div
            className={`absolute aspect-[1/1]
                      ${(highlightedLight === 'Lamp 1' || highlightedLight === null) ? 'opacity-100' : 'opacity-20'}
                      ${lights.find(light=>light.name === 'Lamp 1')?.isOn? 'transition-opacity duration-300 animate-glow' : ''}`}
            onMouseEnter={() => setHighlightedLight('Lamp 1')}
            onMouseLeave={() => setHighlightedLight(null)}
                      style={{
              top: '88%', // Match the lamp's vertical position
              left: '48.8%', // Match the lamp's horizontal position
              width: '5%',
              transform: 'translate(-50%, -50%)', // Center the glow
              zIndex: 15, // Ensure glow is above the lamp image
              borderRadius: '50%', // Make it circular
            }}
          ></div>
          <img
            src={lamp1Select}
            alt="Lamp 1"
            className={`absolute ${
              (highlightedLight === 'Lamp 1')||(highlightedLight === null) ? 'opacity-100' : 'opacity-20'}
              `}
            style={{
              top: '88%', // Adjust vertical position (relative to floor plan)
              left: '48.8%', // Adjust horizontal position (relative to floor plan)
              width: '5%', // Scale by percentage relative to floor plan
              transform: 'translate(-50%, -50%)', // Center the lamp on specified coordinates
              zIndex: highlightedLight === 'Lamp 1' ? 10 : 1, // Ensure visibility during highlight
            }}
          />

          {/* Lamp 2 */}
          <div
            className={`absolute aspect-[1/1]
                      ${(highlightedLight === 'Lamp 2' || highlightedLight === null) ? 'opacity-100' : 'opacity-20'}
                      ${lights.find(light=>light.name === 'Lamp 2')?.isOn? 'transition-opacity duration-300 animate-glow' : ''}`}
            onMouseEnter={() => setHighlightedLight('Lamp 2')}
            onMouseLeave={() => setHighlightedLight(null)}
                      style={{
              top: '34%', // Match the lamp's vertical position
              left: '46.5%', // Match the lamp's horizontal position
              width: '5%',
              transform: 'translate(-50%, -50%)', // Center the glow
              zIndex: 15, // Ensure glow is above the lamp image
              borderRadius: '50%', // Make it circular
            }}
          ></div>
          <img
            src={lamp2Select}
            alt="Lamp 2"
            className={`absolute ${
              (highlightedLight === 'Lamp 2')||(highlightedLight === null) ? 'opacity-100' : 'opacity-20'}
              `}
            style={{
              top: '34%', // Adjust vertical position (relative to floor plan)
              left: '46.5%', // Adjust horizontal position (relative to floor plan)
              width: '5%', // Scale by percentage relative to floor plan
              transform: 'translate(-50%, -50%)', // Center the lamp on specified coordinates
              zIndex: highlightedLight === 'Lamp 2' ? 10 : 1, // Ensure visibility during highlight
            }}
          />

          {/* Lamp 3 */}
          <div
            className={`absolute aspect-[1/1]
                      ${(highlightedLight === 'Lamp 3' || highlightedLight === null) ? 'opacity-100' : 'opacity-20'}
                      ${lights.find(light=>light.name === 'Lamp 3')?.isOn? 'transition-opacity duration-300 animate-glow' : ''}`}
            onMouseEnter={() => setHighlightedLight('Lamp 3')}
            onMouseLeave={() => setHighlightedLight(null)}
                      style={{
              top: '34%', // Match the lamp's vertical position
              left: '65%', // Match the lamp's horizontal position
              width: '5%',
              transform: 'translate(-50%, -50%)', // Center the glow
              zIndex: 15, // Ensure glow is above the lamp image
              borderRadius: '50%', // Make it circular
            }}
          ></div>
          <img
            src={lamp3Select}
            alt="Lamp 3"
            className={`absolute ${
              (highlightedLight === 'Lamp 3')||(highlightedLight === null) ? 'opacity-100' : 'opacity-20'}
              `}
            style={{
              top: '34%', // Adjust vertical position (relative to floor plan)
              left: '65%', // Adjust horizontal position (relative to floor plan)
              width: '5%', // Scale by percentage relative to floor plan
              transform: 'translate(-50%, -50%)', // Center the lamp on specified coordinates
              zIndex: highlightedLight === 'Lamp 3' ? 10 : 1, // Ensure visibility during highlight
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FloorPlan;










