import React from 'react';
import { LineChart, TrendingUp, BarChart } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-brown-800 text-white py-6 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-8 h-8" />
          <h1 className="text-2xl font-bold">Business Forecast AI</h1>
        </div>
        <p className="text-blue-100">
          Powered by advanced AI for accurate financial insights and business forecasting
        </p>
        <div className="flex gap-4 mt-4">
          <div className="flex items-center gap-2">
            <LineChart className="w-5 h-5" />
            <span className="text-sm">Trend Analysis</span>
          </div>
          <div className="flex items-center gap-2">
            <BarChart className="w-5 h-5" />
            <span className="text-sm">Financial Metrics</span>
          </div>
        </div>
      </div>
    </header>
  );
}