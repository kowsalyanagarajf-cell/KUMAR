import React, { useState, useEffect } from 'react';
import './Calculator.css';

const SalaryCalculator = () => {
  const [inputs, setInputs] = useState({
    monthlySalary: '',
    taxPercent: '',
    deductions: ''
  });
  const [results, setResults] = useState({});
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('salaryInputs');
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
      const monthly = parseFloat(inputs.monthlySalary);
      const tax = parseFloat(inputs.taxPercent) / 100;
      const ded = parseFloat(inputs.deductions) || 0;

      if (monthly && inputs.taxPercent) {
        const netMonthly = monthly - (monthly * tax) - ded;
        const annual = netMonthly * 12;

        setResults({
          netSalary: netMonthly.toFixed(2),
          annualSalary: annual.toFixed(2)
        });

        // AI Suggestion
        if (netMonthly < 30000) {
          setSuggestion('📉 Your net salary is low. Consider side income or expense reduction.');
        } else {
          setSuggestion('✅ Your salary is in good range.');
        }

        localStorage.setItem('salaryInputs', JSON.stringify(inputs));
      }
      setLoading(false);
    }, 500);
  };

  const reset = () => {
    setInputs({
      monthlySalary: '',
      taxPercent: '',
      deductions: ''
    });
    setResults({});
    setSuggestion('');
    localStorage.removeItem('salaryInputs');
  };

  const generateReport = () => {
    alert(`Salary Report:\nNet Monthly: ₹${results.netSalary}\nAnnual: ₹${results.annualSalary}`);
  };

  return (
    <div className="calculator">
      <h2>Salary Calculator</h2>
      <div className="inputs">
        <label>Monthly Salary (₹)</label>
        <input type="number" name="monthlySalary" value={inputs.monthlySalary} onChange={handleInputChange} />

        <label>Tax Percentage (%)</label>
        <input type="number" name="taxPercent" value={inputs.taxPercent} onChange={handleInputChange} />

        <label>Deductions (₹)</label>
        <input type="number" name="deductions" value={inputs.deductions} onChange={handleInputChange} />
      </div>
      <div className="buttons">
        <button onClick={calculate} disabled={loading}>Calculate</button>
        <button onClick={reset}>Reset</button>
        <button onClick={generateReport} disabled={!results.netSalary}>Generate Report</button>
      </div>
      {loading && <div className="loading">Calculating...</div>}
      {results.netSalary && (
        <div className="results">
          <h3>Results</h3>
          <p>Net Salary (Monthly): ₹{results.netSalary}</p>
          <p>Annual Salary: ₹{results.annualSalary}</p>
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

export default SalaryCalculator;