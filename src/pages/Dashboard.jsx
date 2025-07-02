import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DashboardCard, { BalanceCard, TransactionCard, SavingsCard, CreditCard } from '../components/DashboardCard';
import { 
  FaBars, 
  FaEye, 
  FaEyeSlash, 
  FaArrowUp, 
  FaArrowDown, 
  FaPlus,
  FaCreditCard,
  FaExchangeAlt,
  FaChartLine,
  FaBell
} from 'react-icons/fa';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [balanceVisible, setBalanceVisible] = useState(true);

  // Get user info from localStorage
  const userInfo = JSON.parse(localStorage.getItem('blueoak_user') || '{}');
  const isAdmin = userInfo.role === 'admin' || userInfo.role === 'manager';

  // Mock data
  const accountData = {
    checking: 12450.75,
    savings: 8750.25,
    creditLimit: 5000,
    creditUsed: 1250
  };

  const recentTransactions = [
    { id: 1, description: 'Coffee Shop', amount: -4.50, date: '2024-01-15', type: 'debit' },
    { id: 2, description: 'Salary Deposit', amount: 3500.00, date: '2024-01-15', type: 'credit' },
    { id: 3, description: 'Grocery Store', amount: -87.32, date: '2024-01-14', type: 'debit' },
    { id: 4, description: 'Online Transfer', amount: -200.00, date: '2024-01-14', type: 'transfer' },
    { id: 5, description: 'ATM Withdrawal', amount: -100.00, date: '2024-01-13', type: 'withdrawal' }
  ];

  const quickActions = isAdmin ? [
    { icon: FaExchangeAlt, label: 'Manage Transfers', color: 'blue', link: '/transfer' },
    { icon: FaPlus, label: 'Create Account', color: 'green', link: '#' },
    { icon: FaCreditCard, label: 'Admin Panel', color: 'purple', link: '#' },
    { icon: FaChartLine, label: 'Reports', color: 'orange', link: '#' }
  ] : [
    { icon: FaExchangeAlt, label: 'Transfer Money', color: 'blue', link: '/transfer' },
    { icon: FaPlus, label: 'Deposit Check', color: 'green', link: '#' },
    { icon: FaCreditCard, label: 'Pay Bills', color: 'purple', link: '#' },
    { icon: FaChartLine, label: 'Investments', color: 'orange', link: '#' }
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition duration-200"
              >
                <FaBars className="text-gray-600" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900 ml-4 lg:ml-0">
                Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100 transition duration-200 relative">
                <FaBell className="text-gray-600" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">JD</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {userInfo.name || 'User'}! 👋
              {isAdmin && <span className="text-lg text-blue-600 ml-2">(Admin)</span>}
            </h2>
            <p className="text-gray-600">
              {isAdmin
                ? "Admin Dashboard - Manage accounts and monitor system activity."
                : "Here's what's happening with your accounts today."
              }
            </p>
          </div>

          {/* Account Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">Checking Balance</h3>
                <button
                  onClick={() => setBalanceVisible(!balanceVisible)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {balanceVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {balanceVisible ? `$${accountData.checking.toLocaleString()}` : '••••••'}
              </p>
              <p className="text-sm text-green-600 mt-2">+2.5% from last month</p>
            </div>

            <SavingsCard amount={accountData.savings} />
            <CreditCard limit={accountData.creditLimit} used={accountData.creditUsed} />
            <TransactionCard count={recentTransactions.length} />
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={index}
                    to={action.link}
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 text-center group"
                  >
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-lg bg-${action.color}-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`text-xl text-${action.color}-600`} />
                    </div>
                    <p className="text-sm font-medium text-gray-900">{action.label}</p>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Recent Transactions</h3>
                <Link to="/transactions" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {recentTransactions.slice(0, 5).map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                        transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {transaction.type === 'credit' ? (
                          <FaArrowDown className="text-green-600" />
                        ) : (
                          <FaArrowUp className="text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{transaction.description}</p>
                        <p className="text-sm text-gray-500">{transaction.date}</p>
                      </div>
                    </div>
                    <p className={`font-semibold ${
                      transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Account Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Account Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Total Balance</span>
                  <span className="font-semibold text-gray-900">
                    ${(accountData.checking + accountData.savings).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Available Credit</span>
                  <span className="font-semibold text-gray-900">
                    ${(accountData.creditLimit - accountData.creditUsed).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Monthly Spending</span>
                  <span className="font-semibold text-red-600">-$1,247.82</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600">Savings Goal Progress</span>
                  <span className="font-semibold text-green-600">75%</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
