import React from 'react';

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Welcome to CalcFusion
      </h2>
      <p className="text-lg mb-12 text-slate-300">
        Your intelligent financial decision system for all calculations and insights.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800/70 transition-all duration-300">
          <h3 className="text-xl font-semibold mb-3 text-purple-400">EMI Calculator</h3>
          <p className="text-slate-300">Calculate your loan EMIs easily with comparison mode.</p>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800/70 transition-all duration-300">
          <h3 className="text-xl font-semibold mb-3 text-purple-400">Currency Converter</h3>
          <p className="text-slate-300">Convert currencies with real-time rates.</p>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800/70 transition-all duration-300">
          <h3 className="text-xl font-semibold mb-3 text-purple-400">Salary Calculator</h3>
          <p className="text-slate-300">Compute your net salary after taxes.</p>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800/70 transition-all duration-300">
          <h3 className="text-xl font-semibold mb-3 text-purple-400">ROI/NPV Calculator</h3>
          <p className="text-slate-300">Analyze your investments with comparison.</p>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800/70 transition-all duration-300">
          <h3 className="text-xl font-semibold mb-3 text-purple-400">Electricity Calculator</h3>
          <p className="text-slate-300">Calculate your electricity bills.</p>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800/70 transition-all duration-300">
          <h3 className="text-xl font-semibold mb-3 text-purple-400">Dashboard</h3>
          <p className="text-slate-300">View your financial overview and insights.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;