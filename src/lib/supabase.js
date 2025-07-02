import { createClient } from '@supabase/supabase-js'

// These are demo credentials - you'll need to replace with your actual Supabase project
const supabaseUrl = 'https://your-project.supabase.co'
const supabaseKey = 'your-anon-key'

// For demo purposes, we'll use a mock setup
// In production, you would use real Supabase credentials
export const supabase = createClient(
  supabaseUrl, 
  supabaseKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    }
  }
)

// Mock database functions for demo (replace with real Supabase calls)
export const mockDatabase = {
  // User accounts data
  accounts: [
    {
      id: 'acc_1',
      user_id: 'betty@email.com',
      account_type: 'checking',
      balance: 12450.75,
      account_number: '****1234'
    },
    {
      id: 'acc_2',
      user_id: 'betty@email.com',
      account_type: 'savings',
      balance: 8750.25,
      account_number: '****5678'
    },
    {
      id: 'acc_3',
      user_id: 'admin@blueoakbank.com',
      account_type: 'checking',
      balance: 50000.00,
      account_number: '****9999'
    }
  ],

  // Transactions data
  transactions: [
    {
      id: 'txn_1',
      from_account: 'acc_1',
      to_account: 'external',
      amount: -4.50,
      description: 'Coffee Shop',
      date: new Date('2024-01-15').toISOString(),
      status: 'completed',
      type: 'debit'
    },
    {
      id: 'txn_2',
      from_account: 'external',
      to_account: 'acc_1',
      amount: 3500.00,
      description: 'Salary Deposit',
      date: new Date('2024-01-15').toISOString(),
      status: 'completed',
      type: 'credit'
    }
  ]
}

// Database operations
export const dbOperations = {
  // Get user accounts
  async getUserAccounts(userEmail) {
    return mockDatabase.accounts.filter(acc => acc.user_id === userEmail)
  },

  // Get account by ID
  async getAccount(accountId) {
    return mockDatabase.accounts.find(acc => acc.id === accountId)
  },

  // Get transactions for user
  async getUserTransactions(userEmail) {
    const userAccounts = await this.getUserAccounts(userEmail)
    const accountIds = userAccounts.map(acc => acc.id)
    
    return mockDatabase.transactions.filter(txn => 
      accountIds.includes(txn.from_account) || accountIds.includes(txn.to_account)
    ).sort((a, b) => new Date(b.date) - new Date(a.date))
  },

  // Create new transaction
  async createTransaction(transactionData) {
    const newTransaction = {
      id: `txn_${Date.now()}`,
      ...transactionData,
      date: new Date().toISOString(),
      status: 'completed'
    }

    // Add to mock database
    mockDatabase.transactions.push(newTransaction)

    // Update account balances
    if (transactionData.from_account !== 'external') {
      const fromAccount = mockDatabase.accounts.find(acc => acc.id === transactionData.from_account)
      if (fromAccount) {
        fromAccount.balance -= Math.abs(transactionData.amount)
      }
    }

    if (transactionData.to_account !== 'external') {
      const toAccount = mockDatabase.accounts.find(acc => acc.id === transactionData.to_account)
      if (toAccount) {
        toAccount.balance += Math.abs(transactionData.amount)
      }
    }

    return newTransaction
  },

  // Update account balance
  async updateAccountBalance(accountId, newBalance) {
    const account = mockDatabase.accounts.find(acc => acc.id === accountId)
    if (account) {
      account.balance = newBalance
      return account
    }
    return null
  },

  // Transfer money between accounts
  async transferMoney(fromAccountId, toAccountId, amount, description) {
    const fromAccount = await this.getAccount(fromAccountId)
    const toAccount = await this.getAccount(toAccountId)

    if (!fromAccount) {
      throw new Error('Source account not found')
    }

    if (fromAccount.balance < amount) {
      throw new Error('Insufficient funds')
    }

    // Create transaction record
    const transaction = await this.createTransaction({
      from_account: fromAccountId,
      to_account: toAccountId || 'external',
      amount: amount,
      description: description,
      type: 'transfer'
    })

    return transaction
  }
}

export default supabase
