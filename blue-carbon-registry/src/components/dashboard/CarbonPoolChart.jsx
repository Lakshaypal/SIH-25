import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Hardcoded data for the chart
const data = [
  { name: 'Jan', value: 1200 },
  { name: 'Feb', value: 2100 },
  { name: 'Mar', value: 1800 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

const CarbonPoolChart = () => (
  <div className="bg-surface p-6 rounded-lg shadow-sm border border-border h-full">
    <h3 className="text-lg font-semibold text-text-primary mb-4">Carbon Pool Liquidity (TCO2)</h3>
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2563EB" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="name" stroke="#64748B" />
        <YAxis stroke="#64748B" />
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <Tooltip wrapperClassName="rounded-md border-border shadow-lg" contentStyle={{ backgroundColor: '#FFFFFF' }}/>
        <Area type="monotone" dataKey="value" stroke="#2563EB" fillOpacity={1} fill="url(#colorValue)" />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export default CarbonPoolChart;