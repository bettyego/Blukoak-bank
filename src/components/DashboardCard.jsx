import React from 'react';

const DashboardCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  color = 'blue',
  onClick,
  className = '',
  children
}) => {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-500',
      text: 'text-blue-600',
      lightBg: 'bg-blue-50',
      iconBg: 'bg-blue-100'
    },
    green: {
      bg: 'bg-green-500',
      text: 'text-green-600',
      lightBg: 'bg-green-50',
      iconBg: 'bg-green-100'
    },
    purple: {
      bg: 'bg-purple-500',
      text: 'text-purple-600',
      lightBg: 'bg-purple-50',
      iconBg: 'bg-purple-100'
    },
    orange: {
      bg: 'bg-orange-500',
      text: 'text-orange-600',
      lightBg: 'bg-orange-50',
      iconBg: 'bg-orange-100'
    },
    red: {
      bg: 'bg-red-500',
      text: 'text-red-600',
      lightBg: 'bg-red-50',
      iconBg: 'bg-red-100'
    }
  };

  const colors = colorClasses[color] || colorClasses.blue;

  return (
    <div 
      className={`
        bg-white rounded-xl shadow-sm border border-gray-200 p-6 
        hover:shadow-md transition-all duration-300 cursor-pointer
        ${className}
      `}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          
          {trend && trendValue && (
            <div className="flex items-center mt-2">
              <span className={`
                text-sm font-medium
                ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'}
              `}>
                {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'} {trendValue}
              </span>
              <span className="text-xs text-gray-500 ml-1">vs last month</span>
            </div>
          )}
        </div>
        
        {Icon && (
          <div className={`
            w-12 h-12 rounded-lg flex items-center justify-center
            ${colors.iconBg}
          `}>
            <Icon className={`text-xl ${colors.text}`} />
          </div>
        )}
      </div>

      {children && (
        <div className="mt-4">
          {children}
        </div>
      )}
    </div>
  );
};

// Specialized card components
export const BalanceCard = ({ balance, accountType = 'Checking', ...props }) => (
  <DashboardCard
    title={`${accountType} Balance`}
    value={`$${balance?.toLocaleString() || '0.00'}`}
    color="blue"
    {...props}
  />
);

export const TransactionCard = ({ count, ...props }) => (
  <DashboardCard
    title="Recent Transactions"
    value={count || '0'}
    color="green"
    {...props}
  />
);

export const SavingsCard = ({ amount, ...props }) => (
  <DashboardCard
    title="Savings Account"
    value={`$${amount?.toLocaleString() || '0.00'}`}
    color="purple"
    {...props}
  />
);

export const CreditCard = ({ limit, used, ...props }) => {
  const available = limit - used;
  const percentage = ((used / limit) * 100).toFixed(1);
  
  return (
    <DashboardCard
      title="Credit Available"
      value={`$${available?.toLocaleString() || '0.00'}`}
      color="orange"
      {...props}
    >
      <div className="mt-2">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Used: ${used?.toLocaleString()}</span>
          <span>{percentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-orange-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </DashboardCard>
  );
};

export default DashboardCard;
