// src/pages/DashboardPage.jsx
import React from 'react';
import { FaChartPie, FaLeaf, FaLock, FaSyncAlt } from 'react-icons/fa';
import StatCard from '../components/dashboard/StatCard';
import CarbonPoolChart from '../components/dashboard/CarbonPoolChart';

// Hardcoded pool data remains the same...
const poolProjects = [
    { name: 'Wakefield Biochar Facility 2', purId: 'PUR-244045', tco2: '600.747', percentage: '59.20%' },
    { name: 'Concepcion 1', purId: 'PUR-432524', tco2: '129.385', percentage: '12.75%' },
    { name: 'American BioCarbon CT, LLC', purId: 'PUR-543800', tco2: '122.77', percentage: '12.10%' },
    { name: 'Oregon Biochar Solutions', purId: 'PUR-753518', tco2: '103.99', percentage: '10.25%' },
];

const DashboardPage = () => {
  // The outer div with padding is removed, as DashboardLayout handles it.
  return (
    <>
      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total carbon bridged" value="21,890,661" icon={FaLeaf} />
        <StatCard title="Total carbon locked" value="19,905,783" icon={FaLock} />
        <StatCard title="Total liquidity" value="1,810,027" icon={FaSyncAlt} />
        <StatCard title="Total carbon retired" value="210,338" icon={FaChartPie} />
      </div>

      {/* Main Content */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Pool Composition */}
        <div className="lg:col-span-2 bg-surface p-6 rounded-lg shadow-sm border border-border">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-text-primary">Toucan Biochar Carbon Pool (CHAR)</h2>
            <span className="text-2xl font-bold">$152.63</span>
          </div>
          <p className="text-sm text-text-secondary mt-2">Credits deposited into pool: 1,015 TCO2</p>
          
          {/* Composition Bar */}
          <div className="w-full flex h-3 rounded-full overflow-hidden my-4">
            <div className="w-[59.20%] bg-blue-700"></div>
            <div className="w-[12.75%] bg-blue-500"></div>
            <div className="w-[12.10%] bg-cyan-400"></div>
            <div className="w-[10.25%] bg-teal-400"></div>
            <div className="w-[5.70%] bg-green-400"></div>
          </div>

          {/* Project List */}
          <div className="space-y-4">
            {poolProjects.map(p => (
              <div key={p.purId} className="flex justify-between items-center border-b border-border pb-2">
                <div>
                  <p className="font-semibold text-text-primary">{p.name}</p>
                  <p className="text-xs text-text-secondary">{p.purId}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{p.tco2} TCO2</p>
                  <p className="text-xs text-text-secondary">{p.percentage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Chart */}
        <div className="lg:col-span-1">
          <CarbonPoolChart />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;