import React, { useState, useEffect, useContext } from 'react';
import { AIContext } from '../contexts/AIContext';

const EMICalculator = () => {
  const { addSuggestion } = useContext(AIContext);
  const [mode, setMode] = useState('single'); // single or compare
  const [inputs, setInputs] = useState({
    loanAmount: '',
    interestRate: '',
    tenure: '',
    monthlySalary: ''
  });
  const [inputs2, setInputs2] = useState({
    loanAmount: '',
    interestRate: '',
    tenure: '',
    monthlySalary: ''
  });
  const [results, setResults] = useState({});
  const [results2, setResults2] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('emiInputs');
    if (saved) {
      setInputs(JSON.parse(saved));
    }
  }, []);

  const handleInputChange = (e, isSecond = false) => {
    const { name, value } = e.target;
    if (isSecond) {
      setInputs2({ ...inputs2, [name]: value });
    } else {
      setInputs({ ...inputs, [name]: value });
    }
  };

  const calculateEMI = (inputSet, setResult) => {
    const P = parseFloat(inputSet.loanAmount);
    const R = parseFloat(inputSet.interestRate) / 100 / 12;
    const N = parseFloat(inputSet.tenure) * 12;

    if (P && R && N) {
      const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
      const totalPayment = emi * N;
      const interestPaid = totalPayment - P;
      setResult({
        monthlyEMI: emi.toFixed(2),
        totalPayment: totalPayment.toFixed(2),
        interestPaid: interestPaid.toFixed(2)
      });
      return emi;
    }
    return 0;
  };

  const calculate = () => {
    setLoading(true);
    setTimeout(() => {
      const emi1 = calculateEMI(inputs, setResults);
      let emi2 = 0;
      if (mode === 'compare') {
        emi2 = calculateEMI(inputs2, setResults2);
      }

      // AI Suggestion
      const salary = parseFloat(inputs.monthlySalary);
      if (salary && emi1 > 0.4 * salary) {
        addSuggestion({ type: 'warning', text: '⚠️ Your EMI is too high. Consider reducing loan amount.' });
      } else if (mode === 'compare' && emi1 > emi2) {
        addSuggestion({ type: 'info', text: '💡 Second option has lower EMI. Consider switching.' });
      } else {
        addSuggestion({ type: 'success', text: '✅ Your EMI is within safe limits.' });
      }
      localStorage.setItem('emiInputs', JSON.stringify(inputs));
      setLoading(false);
    }, 1000);
  };

  const reset = () => {
    setInputs({ loanAmount: '', interestRate: '', tenure: '', monthlySalary: '' });
    setInputs2({ loanAmount: '', interestRate: '', tenure: '', monthlySalary: '' });
    setResults({});
    setResults2({});
    localStorage.removeItem('emiInputs');
  };

  const generateReport = () => {
    alert(`EMI Report:\nMonthly EMI: ₹${results.monthlyEMI}\nTotal Payment: ₹${results.totalPayment}\nInterest Paid: ₹${results.interestPaid}`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        EMI Calculator
      </h2>

      <div className="mb-6">
        <button
          onClick={() => setMode('single')}
          className={`px-4 py-2 rounded-l-lg ${mode === 'single' ? 'bg-purple-600' : 'bg-slate-700'} text-white`}
        >
          Single Calculation
        </button>
        <button
          onClick={() => setMode('compare')}
          className={`px-4 py-2 rounded-r-lg ${mode === 'compare' ? 'bg-purple-600' : 'bg-slate-700'} text-white`}
        >
          Compare Options
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-purple-400">Option 1</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Loan Amount (₹)</label>
              <input
                type="number"
                name="loanAmount"
                value={inputs.loanAmount}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Interest Rate (% per annum)</label>
              <input
                type="number"
                name="interestRate"
                value={inputs.interestRate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tenure (years)</label>
              <input
                type="number"
                name="tenure"
                value={inputs.tenure}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Monthly Salary (₹) - for suggestion</label>
              <input
                type="number"
                name="monthlySalary"
                value={inputs.monthlySalary}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>

        {mode === 'compare' && (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-purple-400">Option 2</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Loan Amount (₹)</label>
                <input
                  type="number"
                  name="loanAmount"
                  value={inputs2.loanAmount}
                  onChange={(e) => handleInputChange(e, true)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Interest Rate (% per annum)</label>
                <input
                  type="number"
                  name="interestRate"
                  value={inputs2.interestRate}
                  onChange={(e) => handleInputChange(e, true)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tenure (years)</label>
                <input
                  type="number"
                  name="tenure"
                  value={inputs2.tenure}
                  onChange={(e) => handleInputChange(e, true)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex space-x-4 mt-6">
        <button
          onClick={calculate}
          disabled={loading}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50"
        >
          {loading ? 'Calculating...' : 'Calculate'}
        </button>
        <button
          onClick={reset}
          className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all duration-300"
        >
          Reset
        </button>
        <button
          onClick={generateReport}
          disabled={!results.monthlyEMI}
          className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all duration-300 disabled:opacity-50"
        >
          Generate Report
        </button>
      </div>

      {results.monthlyEMI && (
        <div className="mt-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-purple-400">Results - Option 1</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">₹{results.monthlyEMI}</p>
              <p className="text-sm text-slate-300">Monthly EMI</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-400">₹{results.totalPayment}</p>
              <p className="text-sm text-slate-300">Total Payment</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-400">₹{results.interestPaid}</p>
              <p className="text-sm text-slate-300">Interest Paid</p>
            </div>
          </div>
        </div>
      )}

      {mode === 'compare' && results2.monthlyEMI && (
        <div className="mt-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-purple-400">Results - Option 2</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">₹{results2.monthlyEMI}</p>
              <p className="text-sm text-slate-300">Monthly EMI</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-400">₹{results2.totalPayment}</p>
              <p className="text-sm text-slate-300">Total Payment</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-400">₹{results2.interestPaid}</p>
              <p className="text-sm text-slate-300">Interest Paid</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EMICalculator;