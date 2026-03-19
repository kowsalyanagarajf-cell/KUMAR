import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [data, setData] = useState({
    income: 50000,
    expenses: 30000,
    emi: 10000,
    savings: 10000
  });
  const [healthScore, setHealthScore] = useState(0);

  useEffect(() => {
    // Load from localStorage or mock
    const emiInputs = JSON.parse(localStorage.getItem('emiInputs') || '{}');
    const salaryInputs = JSON.parse(localStorage.getItem('salaryInputs') || '{}');
    const electricityInputs = JSON.parse(localStorage.getItem('electricityInputs') || '{}');

    const income = parseFloat(salaryInputs.monthlySalary) || 50000;
    const expenses = (parseFloat(electricityInputs.units) * parseFloat(electricityInputs.costPerUnit) || 5000) + (parseFloat(emiInputs.loanAmount) * 0.01 || 3000);
    const emi = parseFloat(emiInputs.loanAmount) * 0.01 || 10000; // Mock
    const savings = income - expenses - emi;

    setData({ income, expenses, emi, savings });

    // Health Score Logic
    let score = 50; // Base
    if (savings > 0) score += 20;
    if (emi < income * 0.3) score += 20;
    if (expenses < income * 0.6) score += 10;
    setHealthScore(Math.min(score, 100));
  }, []);

  const chartData = {
    labels: ['Income', 'Expenses', 'EMI', 'Savings'],
    datasets: [
      {
        label: 'Amount (₹)',
        data: [data.income, data.expenses, data.emi, data.savings],
        backgroundColor: ['#10b981', '#ef4444', '#f59e0b', '#3b82f6'],
      },
    ],
  };

  const getHealthLabel = () => {
    if (healthScore >= 80) return 'Good';
    if (healthScore >= 50) return 'Average';
    return 'Risky';
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Dashboard
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-purple-400">Income vs Expense Chart</h3>
          <Bar data={chartData} />
        </div>

        <div className="space-y-6">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-purple-400">Profit Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Income:</span>
                <span className="text-green-400">₹{data.income}</span>
              </div>
              <div className="flex justify-between">
                <span>Expenses:</span>
                <span className="text-red-400">₹{data.expenses}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Profit:</span>
                <span className="text-blue-400">₹{data.income - data.expenses}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-purple-400">Loan Status</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>EMI:</span>
                <span className="text-orange-400">₹{data.emi}</span>
              </div>
              <div className="flex justify-between">
                <span>Outstanding:</span>
                <span className="text-slate-300">₹{data.emi * 10} (Mock)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4 text-purple-400">Business Health Score</h3>
        <div className="flex items-center space-x-4">
          <div className="flex-1 bg-slate-700 rounded-full h-6">
            <div
              className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-6 rounded-full transition-all duration-500"
              style={{ width: `${healthScore}%` }}
            ></div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white">{healthScore}/100</p>
            <p className={`text-sm ${healthScore >= 80 ? 'text-green-400' : healthScore >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
              {getHealthLabel()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;