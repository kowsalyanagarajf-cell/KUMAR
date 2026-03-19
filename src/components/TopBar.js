import React from 'react';

const TopBar = () => {
  return (
    <div className="h-16 bg-gradient-to-r from-slate-800 to-slate-700 shadow-lg flex items-center justify-between px-6">
      <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        CalcFusion: Intelligent Financial Decision System
      </h1>
      <div className="flex items-center space-x-4">
        <span className="text-white">Welcome, User!</span>
      </div>
    </div>
  );
};

export default TopBar;