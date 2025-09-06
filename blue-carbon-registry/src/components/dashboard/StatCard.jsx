import React from 'react';

const StatCard = ({ title, value, icon: Icon }) => (
  <div className="bg-surface p-6 rounded-lg shadow-sm border border-border">
    <div className="flex items-center">
      {Icon && <Icon className="h-6 w-6 text-secondary mr-4" />}
      <div>
        <dt className="text-sm font-medium text-text-secondary truncate">{title}</dt>
        <dd className="mt-1 text-3xl font-semibold text-text-primary">{value}</dd>
      </div>
    </div>
  </div>
);

export default StatCard;