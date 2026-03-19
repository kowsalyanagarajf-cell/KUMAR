import React, { createContext, useState } from 'react';

export const AIContext = createContext();

export const AIProvider = ({ children }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [healthScore, setHealthScore] = useState(75);

  const addSuggestion = (suggestion) => {
    setSuggestions(prev => [suggestion, ...prev.slice(0, 4)]); // Keep last 5
  };

  return (
    <AIContext.Provider value={{ suggestions, addSuggestion, healthScore, setHealthScore }}>
      {children}
    </AIContext.Provider>
  );
};