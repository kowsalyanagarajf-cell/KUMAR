import React, { useState, useEffect } from 'react';
import './Calculator.css';

const ElectricityCalculator = () => {
  const [inputs, setInputs] = useState({
    units: '',
    costPerUnit: ''
  });
  const [result, setResult] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('electricityInputs');
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
      const bill = parseFloat(inputs.units) * parseFloat(inputs.costPerUnit);
      setResult(bill.toFixed(2));

      // AI Suggestion
      if (bill > 2000) {
        setSuggestion('⚡ High electricity bill. Try reducing usage during peak hours.');
      } else {
        setSuggestion('✅ Bill is reasonable.');
      }

      localStorage.setItem('electricityInputs', JSON.stringify(inputs));
      setLoading(false);
    }, 500);
  };

  const reset = () => {
    setInputs({
      units: '',
      costPerUnit: ''
    });
    setResult('');
    setSuggestion('');
    localStorage.removeItem('electricityInputs');
  };

  const generateReport = () => {
    alert(`Electricity Bill Report:\nTotal Bill: ₹${result}`);
  };

  return (
    <div className="calculator">
      <h2>Electricity Calculator</h2>
      <div className="inputs">
        <label>Units Consumed</label>
        <input type="number" name="units" value={inputs.units} onChange={handleInputChange} />

        <label>Cost per Unit (₹)</label>
        <input type="number" name="costPerUnit" value={inputs.costPerUnit} onChange={handleInputChange} />
      </div>
      <div className="buttons">
        <button onClick={calculate} disabled={loading}>Calculate</button>
        <button onClick={reset}>Reset</button>
        <button onClick={generateReport} disabled={!result}>Generate Report</button>
      </div>
      {loading && <div className="loading">Calculating...</div>}
      {result && (
        <div className="results">
          <h3>Result</h3>
          <p>Total Bill: ₹{result}</p>
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

export default ElectricityCalculator;