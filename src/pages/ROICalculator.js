import React, { useState, useEffect } from 'react';
import './Calculator.css';

const ROICalculator = () => {
  const [inputs, setInputs] = useState({
    investment: '',
    returnRate: '',
    time: ''
  });
  const [results, setResults] = useState({});
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('roiInputs');
    if (saved) {
      setInputs(JSON.parse(saved));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const calculate = () => {
    setLoading(true);
    setTimeout(() => {
      const inv = parseFloat(inputs.investment);
      const rate = parseFloat(inputs.returnRate) / 100;
      const t = parseFloat(inputs.time);

      if (inv && inputs.returnRate && t) {
        const roi = ((inv * rate * t) / inv) * 100; // Simplified
        const npv = -inv + (inv * (1 + rate * t)); // Simplified NPV

        setResults({
          roi: roi.toFixed(2),
          npv: npv.toFixed(2)
        });

        // AI Suggestion
        if (roi < 10) {
          setSuggestion('💡 Low ROI. Consider higher return investments.');
        } else {
          setSuggestion('✅ Good ROI potential.');
        }

        localStorage.setItem('roiInputs', JSON.stringify(inputs));
      }
      setLoading(false);
    }, 500);
  };

  const reset = () => {
    setInputs({
      investment: '',
      returnRate: '',
      time: ''
    });
    setResults({});
    setSuggestion('');
    localStorage.removeItem('roiInputs');
  };

  const generateReport = () => {
    alert(`ROI/NPV Report:\nROI: ${results.roi}%\nNPV: ₹${results.npv}`);
  };

  return (
    <div className="calculator">
      <h2>ROI/NPV Calculator</h2>
      <div className="inputs">
        <label>Investment (₹)</label>
        <input type="number" name="investment" value={inputs.investment} onChange={handleInputChange} />

        <label>Return Rate (% per annum)</label>
        <input type="number" name="returnRate" value={inputs.returnRate} onChange={handleInputChange} />

        <label>Time (years)</label>
        <input type="number" name="time" value={inputs.time} onChange={handleInputChange} />
      </div>
      <div className="buttons">
        <button onClick={calculate} disabled={loading}>Calculate</button>
        <button onClick={reset}>Reset</button>
        <button onClick={generateReport} disabled={!results.roi}>Generate Report</button>
      </div>
      {loading && <div className="loading">Calculating...</div>}
      {results.roi && (
        <div className="results">
          <h3>Results</h3>
          <p>ROI: {results.roi}%</p>
          <p>Net Present Value: ₹{results.npv}</p>
        </div>
      )}
      {suggestion && (
        <div className="suggestion">
          <p>{suggestion}</p>
        </div>
      )}
    </div>
  );
};

export default ROICalculator;