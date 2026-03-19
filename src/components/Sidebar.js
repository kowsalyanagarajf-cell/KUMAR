import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gradient-to-b from-slate-800 to-slate-900 shadow-lg">
      <div className="p-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-8">
          CalcFusion
        </h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                to="/"
                className="block px-4 py-3 rounded-lg bg-slate-700 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all duration-300 text-white font-medium"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/emi"
                className="block px-4 py-3 rounded-lg bg-slate-700 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all duration-300 text-white font-medium"
              >
                EMI Calculator
              </Link>
            </li>
            <li>
              <Link
                to="/currency"
                className="block px-4 py-3 rounded-lg bg-slate-700 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all duration-300 text-white font-medium"
              >
                Currency Converter
              </Link>
            </li>
            <li>
              <Link
                to="/salary"
                className="block px-4 py-3 rounded-lg bg-slate-700 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all duration-300 text-white font-medium"
              >
                Salary Calculator
              </Link>
            </li>
            <li>
              <Link
                to="/roi"
                className="block px-4 py-3 rounded-lg bg-slate-700 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all duration-300 text-white font-medium"
              >
                ROI/NPV Calculator
              </Link>
            </li>
            <li>
              <Link
                to="/electricity"
                className="block px-4 py-3 rounded-lg bg-slate-700 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all duration-300 text-white font-medium"
              >
                Electricity Calculator
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="block px-4 py-3 rounded-lg bg-slate-700 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all duration-300 text-white font-medium"
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;