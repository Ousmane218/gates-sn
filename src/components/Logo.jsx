import React from 'react';

const Logo = () => (
    <div className="inline-flex items-center group cursor-pointer px-2 py-1">
        <div className="relative">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent animate-pulse hover:animate-none transition-all duration-500 hover:scale-110 hover:drop-shadow-2xl">
                Gates.sn
            </h1>
            <div className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-blue-600 to-blue-400 group-hover:w-full transition-all duration-500 ease-in-out"></div>
        </div>
    </div>
);

export default Logo; 