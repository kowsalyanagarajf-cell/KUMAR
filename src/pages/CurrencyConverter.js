import React, { useState, useEffect, useCallback } from 'react';

const CurrencyConverter = () => {
  const [inputs, setInputs] = useState({
    amount: '',
    fromCurrency: 'USD',
    toCurrency: 'INR'
  });
  const [result, setResult] = useState('');
  const [rate, setRate] = useState(0);
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);

  const currencies = ['USD', 'EUR', 'INR', 'GBP', 'JPY', 'CAD', 'AUD'];

  const fetchRate = useCallback(async () => {
    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${inputs.fromCurrency}`);
      const data = await response.json();
      setRate(data.rates[inputs.toCurrency]);
    } catch (error) {
      console.error('Error fetching rate:', error);
    }
  }, [inputs.fromCurrency, inputs.toCurrency]);

  useEffect(() => {
    const saved = localStorage.getItem('currencyInputs');
    if (saved) {
      setInputs(JSON.parse(saved));
    }
    fetchRate();
  }, [fetchRate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const convert = () => {
    setLoading(true);
    setTimeout(() => {
      const converted = parseFloat(inputs.amount) * rate;
      setResult(converted.toFixed(2));

      // AI Suggestion
      if (converted > 10000) {
        setSuggestion('💰 Large amount conversion. Ensure secure transaction.');
      } else {
        setSuggestion('✅ Conversion completed.');
      }

      localStorage.setItem('currencyInputs', JSON.stringify(inputs));
      setLoading(false);
    }, 500);
  };

  const updateRate = () => {
    fetchRate();
  };

  const reset = () => {
    setInputs({ amount: '', fromCurrency: 'USD', toCurrency: 'INR' });
    setResult('');
    setSuggestion('');
    localStorage.removeItem('currencyInputs');
  };

  const generateReport = () => {
    alert(`Currency Conversion Report:\n${inputs.amount} ${inputs.fromCurrency} = ${result} ${inputs.toCurrency}\nRate: ${rate}`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Currency Converter
      </h2>

      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Amount</label>
            <input
              type="number"
              name="amount"
              value={inputs.amount}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">From Currency</label>
            <select
              name="fromCurrency"
              value={inputs.fromCurrency}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {currencies.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">To Currency</label>
            <select
              name="toCurrency"
              value={inputs.toCurrency}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {currencies.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex items-end">
            <p className="text-sm text-slate-300">
              Exchange Rate: 1 {inputs.fromCurrency} = {rate} {inputs.toCurrency}
            </p>
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={convert}
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'Converting...' : 'Convert'}
          </button>
          <button
            onClick={updateRate}
            className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all duration-300"
          >
            Update Rate
          </button>
          <button
            onClick={reset}
            className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all duration-300"
          >
            Reset
          </button>
          <button
            onClick={generateReport}
            disabled={!result}
            className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all duration-300 disabled:opacity-50"
          >
            Generate Report
          </button>
        </div>

        {result && (
          <div className="mt-6 bg-slate-700/50 rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2 text-purple-400">Result</h3>
            <p className="text-2xl font-bold text-green-400">
              {inputs.amount} {inputs.fromCurrency} = {result} {inputs.toCurrency}
            </p>
          </div>
        )}

        {suggestion && (
          <div className="mt-4 bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 rounded-lg p-4">
            <p className="text-blue-300">{suggestion}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;