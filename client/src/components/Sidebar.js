import React from 'react';

function SideBar() {
    return (
        <div className="w-64 h-full bg-white shadow-md p-4">
            <ul className="space-y-4">
                <li className="flex items-center space-x-2 text-gray-700 hover:text-blue-500">
                    <span>📊</span> <span>Dashboard</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-700 hover:text-blue-500">
                    <span>📱</span> <span>Apps</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-700 hover:text-blue-500">
                    <span>📄</span> <span>Pages</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-700 hover:text-blue-500">
                    <span>📝</span> <span>Forms</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-700 hover:text-blue-500">
                    <span>📂</span> <span>Tables</span>
                </li>
            </ul>
        </div>
    );
}

export default SideBar;
