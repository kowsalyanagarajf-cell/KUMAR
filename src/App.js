import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AIProvider } from './contexts/AIContext';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import AIAssistant from './components/AIAssistant';
import Home from './pages/Home';
import EMICalculator from './pages/EMICalculator';
import CurrencyConverter from './pages/CurrencyConverter';
import SalaryCalculator from './pages/SalaryCalculator';
import ROICalculator from './pages/ROICalculator';
import ElectricityCalculator from './pages/ElectricityCalculator';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <AIProvider>
      <Router>
        <div className="flex h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <TopBar />
            <main className="flex-1 overflow-auto p-6">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/emi" element={<EMICalculator />} />
                <Route path="/currency" element={<CurrencyConverter />} />
                <Route path="/salary" element={<SalaryCalculator />} />
                <Route path="/roi" element={<ROICalculator />} />
                <Route path="/electricity" element={<ElectricityCalculator />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </main>
          </div>
          <AIAssistant />
        </div>
      </Router>
    </AIProvider>
  );
}

export default App;