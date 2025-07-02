import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { FaBars, FaArrowRight, FaUser, FaDollarSign, FaCommentAlt, FaHistory } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Transfer = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [transferData, setTransferData] = useState({
    fromAccount: 'checking',
    toAccount: '',
    recipient: '',
    amount: '',
    memo: '',
    transferType: 'internal' // internal, external, contact
  });
  const [isLoading, setIsLoading] = useState(false);

  const accounts = [
    { id: 'checking', name: 'Checking Account', balance: 12450.75, number: '****1234' },
    { id: 'savings', name: 'Savings Account', balance: 8750.25, number: '****5678' }
  ];

  const recentContacts = [
    { id: 1, name: 'John Smith', email: 'john@email.com', lastTransfer: '$500.00' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@email.com', lastTransfer: '$250.00' },
    { id: 3, name: 'Mike Wilson', email: 'mike@email.com', lastTransfer: '$100.00' }
  ];

  const recentTransfers = [
    { id: 1, recipient: 'John Smith', amount: 500.00, date: '2024-01-15', status: 'completed' },
    { id: 2, recipient: 'Savings Account', amount: 1000.00, date: '2024-01-14', status: 'completed' },
    { id: 3, recipient: 'Sarah Johnson', amount: 250.00, date: '2024-01-13', status: 'pending' }
  ];

  const handleChange = (e) => {
    setTransferData({
      ...transferData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!transferData.amount || !transferData.recipient) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Information',
        text: 'Please fill in all required fields.',
        confirmButtonColor: '#3B82F6'
      });
      return;
    }

    if (parseFloat(transferData.amount) <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Amount',
        text: 'Please enter a valid amount.',
        confirmButtonColor: '#3B82F6'
      });
      return;
    }

    const fromAccount = accounts.find(acc => acc.id === transferData.fromAccount);
    if (parseFloat(transferData.amount) > fromAccount.balance) {
      Swal.fire({
        icon: 'error',
        title: 'Insufficient Funds',
        text: 'You do not have enough balance for this transfer.',
        confirmButtonColor: '#3B82F6'
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      Swal.fire({
        icon: 'success',
        title: 'Transfer Successful!',
        text: `$${parseFloat(transferData.amount).toFixed(2)} has been transferred successfully.`,
        confirmButtonColor: '#10B981',
        timer: 3000,
        showConfirmButton: false
      });
      
      // Reset form
      setTransferData({
        fromAccount: 'checking',
        toAccount: '',
        recipient: '',
        amount: '',
        memo: '',
        transferType: 'internal'
      });
      
      setIsLoading(false);
    }, 2000);
  };

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
                Transfer Money
              </h1>
            </div>
            <Link
              to="/dashboard"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Back to Dashboard
            </Link>
          </div>
        </header>

        {/* Transfer Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Transfer Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Send Money</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Transfer Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Transfer Type
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { value: 'internal', label: 'Between My Accounts' },
                          { value: 'external', label: 'To External Account' },
                          { value: 'contact', label: 'To Contact' }
                        ].map((type) => (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() => setTransferData({...transferData, transferType: type.value})}
                            className={`p-3 rounded-lg border text-sm font-medium transition duration-200 ${
                              transferData.transferType === type.value
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            {type.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* From Account */}
                    <div>
                      <label htmlFor="fromAccount" className="block text-sm font-medium text-gray-700 mb-2">
                        From Account
                      </label>
                      <select
                        id="fromAccount"
                        name="fromAccount"
                        value={transferData.fromAccount}
                        onChange={handleChange}
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {accounts.map((account) => (
                          <option key={account.id} value={account.id}>
                            {account.name} ({account.number}) - ${account.balance.toLocaleString()}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* To Account/Recipient */}
                    {transferData.transferType === 'internal' ? (
                      <div>
                        <label htmlFor="toAccount" className="block text-sm font-medium text-gray-700 mb-2">
                          To Account
                        </label>
                        <select
                          id="toAccount"
                          name="toAccount"
                          value={transferData.toAccount}
                          onChange={handleChange}
                          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        >
                          <option value="">Select account</option>
                          {accounts
                            .filter(account => account.id !== transferData.fromAccount)
                            .map((account) => (
                              <option key={account.id} value={account.id}>
                                {account.name} ({account.number})
                              </option>
                            ))}
                        </select>
                      </div>
                    ) : (
                      <div>
                        <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-2">
                          {transferData.transferType === 'contact' ? 'Select Contact' : 'Recipient Email/Account'}
                        </label>
                        {transferData.transferType === 'contact' ? (
                          <select
                            id="recipient"
                            name="recipient"
                            value={transferData.recipient}
                            onChange={handleChange}
                            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          >
                            <option value="">Select contact</option>
                            {recentContacts.map((contact) => (
                              <option key={contact.id} value={contact.email}>
                                {contact.name} ({contact.email})
                              </option>
                            ))}
                          </select>
                        ) : (
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <FaUser className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              id="recipient"
                              name="recipient"
                              type="email"
                              value={transferData.recipient}
                              onChange={handleChange}
                              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Enter email or account number"
                              required
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {/* Amount */}
                    <div>
                      <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                        Amount
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaDollarSign className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="amount"
                          name="amount"
                          type="number"
                          step="0.01"
                          min="0"
                          value={transferData.amount}
                          onChange={handleChange}
                          className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="0.00"
                          required
                        />
                      </div>
                    </div>

                    {/* Memo */}
                    <div>
                      <label htmlFor="memo" className="block text-sm font-medium text-gray-700 mb-2">
                        Memo (Optional)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                          <FaCommentAlt className="h-5 w-5 text-gray-400" />
                        </div>
                        <textarea
                          id="memo"
                          name="memo"
                          rows="3"
                          value={transferData.memo}
                          onChange={handleChange}
                          className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Add a note for this transfer"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Processing...
                        </div>
                      ) : (
                        <>
                          <span>Send Money</span>
                          <FaArrowRight className="ml-2" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-6">
                {/* Recent Contacts */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Contacts</h3>
                  <div className="space-y-3">
                    {recentContacts.map((contact) => (
                      <div
                        key={contact.id}
                        className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition duration-200"
                        onClick={() => setTransferData({...transferData, recipient: contact.email, transferType: 'contact'})}
                      >
                        <div>
                          <p className="font-medium text-gray-900">{contact.name}</p>
                          <p className="text-sm text-gray-500">{contact.email}</p>
                        </div>
                        <p className="text-sm text-gray-600">{contact.lastTransfer}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Transfers */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Transfers</h3>
                    <FaHistory className="text-gray-400" />
                  </div>
                  <div className="space-y-3">
                    {recentTransfers.map((transfer) => (
                      <div key={transfer.id} className="flex items-center justify-between p-3 border-b border-gray-100 last:border-b-0">
                        <div>
                          <p className="font-medium text-gray-900">{transfer.recipient}</p>
                          <p className="text-sm text-gray-500">{transfer.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">${transfer.amount.toFixed(2)}</p>
                          <p className={`text-xs ${
                            transfer.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                          }`}>
                            {transfer.status}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Transfer;
