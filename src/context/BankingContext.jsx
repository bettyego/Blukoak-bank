import React, { createContext, useContext, useState, useEffect } from 'react';
import { dbOperations } from '../lib/supabase';

const BankingContext = createContext();

export const useBanking = () => {
  const context = useContext(BankingContext);
  if (!context) {
    throw new Error('useBanking must be used within a BankingProvider');
  }
  return context;
};

export const BankingProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Initialize user data
  useEffect(() => {
    const userData = localStorage.getItem('blueoak_user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      loadUserData(parsedUser.email);
    }
  }, []);

  // Load user accounts and transactions
  const loadUserData = async (userEmail) => {
    setLoading(true);
    try {
      const userAccounts = await dbOperations.getUserAccounts(userEmail);
      const userTransactions = await dbOperations.getUserTransactions(userEmail);
      
      setAccounts(userAccounts);
      setTransactions(userTransactions);
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (email, userData) => {
    setUser(userData);
    localStorage.setItem('blueoak_user', JSON.stringify(userData));
    await loadUserData(email);
  };

  // Logout user
  const logout = () => {
    setUser(null);
    setAccounts([]);
    setTransactions([]);
    localStorage.removeItem('blueoak_user');
  };

  // Transfer money
  const transferMoney = async (fromAccountId, toAccountId, amount, description, recipientEmail) => {
    setLoading(true);
    try {
      // For external transfers, we'll create a transaction without updating the recipient
      const transaction = await dbOperations.transferMoney(
        fromAccountId, 
        toAccountId || 'external', 
        amount, 
        description
      );

      // Reload user data to reflect changes
      await loadUserData(user.email);

      return transaction;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Get account balance
  const getAccountBalance = (accountId) => {
    const account = accounts.find(acc => acc.id === accountId);
    return account ? account.balance : 0;
  };

  // Get account by type
  const getAccountByType = (type) => {
    return accounts.find(acc => acc.account_type === type);
  };

  // Get recent transactions
  const getRecentTransactions = (limit = 5) => {
    return transactions.slice(0, limit);
  };

  // Calculate total balance
  const getTotalBalance = () => {
    return accounts.reduce((total, account) => total + account.balance, 0);
  };

  // Get spending this month
  const getMonthlySpending = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    return transactions
      .filter(txn => {
        const txnDate = new Date(txn.date);
        return txnDate.getMonth() === currentMonth && 
               txnDate.getFullYear() === currentYear &&
               txn.amount < 0;
      })
      .reduce((total, txn) => total + Math.abs(txn.amount), 0);
  };

  const value = {
    // State
    user,
    accounts,
    transactions,
    loading,

    // Actions
    login,
    logout,
    transferMoney,
    loadUserData,

    // Getters
    getAccountBalance,
    getAccountByType,
    getRecentTransactions,
    getTotalBalance,
    getMonthlySpending
  };

  return (
    <BankingContext.Provider value={value}>
      {children}
    </BankingContext.Provider>
  );
};

export default BankingContext;
