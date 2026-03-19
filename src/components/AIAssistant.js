import React, { useContext } from 'react';
import { AIContext } from '../contexts/AIContext';

const AIAssistant = () => {
  const { suggestions, healthScore } = useContext(AIContext);

  const getHealthLabel = () => {
    if (healthScore >= 80) return 'Good';
    if (healthScore >= 50) return 'Average';
    return 'Risky';
  };

  return (
    <div className="w-80 bg-gradient-to-b from-slate-800 to-slate-900 shadow-lg p-6 overflow-y-auto">
      <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        AI Assistant
      </h3>
      <div className="space-y-4 mb-6">
        {suggestions.length === 0 ? (
          <p className="text-slate-400 text-sm">No suggestions yet. Start calculating!</p>
        ) : (
          suggestions.map((suggestion, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg backdrop-blur-sm border ${
                suggestion.type === 'warning'
                  ? 'bg-red-500/20 border-red-500/30'
                  : suggestion.type === 'info'
                  ? 'bg-blue-500/20 border-blue-500/30'
                  : 'bg-green-500/20 border-green-500/30'
              }`}
            >
              <p className="text-sm">{suggestion.text}</p>
            </div>
          ))
        )}
      </div>
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
        <h4 className="text-lg font-semibold mb-2 text-purple-400">Business Health Score</h4>
        <div className="bg-slate-700 rounded-full h-4 mb-2">
          <div
            className={`h-4 rounded-full transition-all duration-500 ${
              healthScore >= 80 ? 'bg-gradient-to-r from-green-400 to-green-600' :
              healthScore >= 50 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
              'bg-gradient-to-r from-red-400 to-red-600'
            }`}
            style={{ width: `${healthScore}%` }}
          ></div>
        </div>
        <p className="text-sm text-slate-300">{healthScore}/100 - {getHealthLabel()}</p>
      </div>
    </div>
  );
};

export default AIAssistant;