export const mockBalance = {
  total: 12543.89,
  accounts: [
    { id: 'acc_1', name: 'Checking Account', balance: 4500.50, color: '#3f51b5' },
    { id: 'acc_2', name: 'Savings Account', balance: 8000.00, color: '#009688' },
    { id: 'acc_3', name: 'Digital Wallet', balance: 43.39, color: '#ff9800' },
  ],
};

export const mockKPIs = {
  income: { value: 8500.00, trend: '+12.5%', isPositive: true },
  expenses: { value: 3200.50, trend: '-4.2%', isPositive: true }, // lower expenses is positive
  savings: { value: 5299.50, trend: '+8.1%', isPositive: true },
  totalBalance: { value: 12543.89, trend: '+5.4%', isPositive: true },
};

export const mockTransactions = [
  { id: 'tx_1', date: '2026-03-12', description: 'Supermarket', amount: -154.20, type: 'expense', category: 'Food' },
  { id: 'tx_2', date: '2026-03-11', description: 'Salary', amount: 5000.00, type: 'income', category: 'Salary' },
  { id: 'tx_3', date: '2026-03-10', description: 'Electric Bill', amount: -85.50, type: 'expense', category: 'Housing' },
  { id: 'tx_4', date: '2026-03-09', description: 'Internet', amount: -60.00, type: 'expense', category: 'Housing' },
  { id: 'tx_5', date: '2026-03-08', description: 'Freelance Design', amount: 800.00, type: 'income', category: 'Side Hustle' },
  { id: 'tx_6', date: '2026-03-05', description: 'Restaurant', amount: -120.00, type: 'expense', category: 'Food' },
  { id: 'tx_7', date: '2026-03-02', description: 'Gym Membership', amount: -40.00, type: 'expense', category: 'Health' },
  { id: 'tx_8', date: '2026-03-01', description: 'Coffee Shop', amount: -15.80, type: 'expense', category: 'Food' },
];

export const mockChartData = [
  { name: 'Mon', income: 400, expense: 240 },
  { name: 'Tue', income: 300, expense: 139 },
  { name: 'Wed', income: 200, expense: 980 },
  { name: 'Thu', income: 278, expense: 390 },
  { name: 'Fri', income: 189, expense: 480 },
  { name: 'Sat', income: 239, expense: 380 },
  { name: 'Sun', income: 349, expense: 430 },
];

export const mockCategoryData = [
  { name: 'Food', value: 450, color: '#FF6B6B' },
  { name: 'Housing', value: 900, color: '#4ECDC4' },
  { name: 'Transport', value: 200, color: '#45B7D1' },
  { name: 'Entertainment', value: 150, color: '#96CEB4' },
  { name: 'Health', value: 100, color: '#FFEEAD' },
];
