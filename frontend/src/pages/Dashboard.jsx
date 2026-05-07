import React, { useEffect, useState } from 'react';
import { Typography, Box, CircularProgress, Alert } from '@mui/material';
import KPICards from '../components/KPICards';
import IncomeExpenseChart from '../components/IncomeExpenseChart';
import CategoryPieChart from '../components/CategoryPieChart';
import RecentTransactionsPreview from '../components/RecentTransactionsPreview';
import BalanceCard from '../components/BalanceCard';
import { fetchBalance, fetchTransactions } from '../api';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { token, user } = useAuth();
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try {
                const balData = await fetchBalance(token);
                const txData = await fetchTransactions(token);
                setBalance(parseFloat(balData.balance) || 0);
                setTransactions(txData.transactions || []);
            } catch (err) {
                setError('Failed to load dashboard data.');
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [token]);

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;
    if (error) return <Alert severity="error">{error}</Alert>;

    // Calculate KPIs properly using user ID
    let allTimeIncome = 0;
    let allTimeExpenses = 0;
    let recentIncome = 0;
    let recentExpenses = 0;

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    transactions.forEach(t => {
        const amt = Math.abs(parseFloat(t.amount));
        const isRecent = new Date(t.date) >= sevenDaysAgo;
        
        let isIncome = false;
        let isExpense = false;

        if (t.type === 'deposit') isIncome = true;
        if (t.type === 'transfer' && t.receiver_id === user?.id) isIncome = true;
        
        if (t.type === 'withdrawn' || t.type === 'withdraw') isExpense = true;
        if (t.type === 'transfer' && t.sender_id === user?.id) isExpense = true;

        if (isIncome) {
            allTimeIncome += amt;
            if (isRecent) recentIncome += amt;
        }
        if (isExpense) {
            allTimeExpenses += amt;
            if (isRecent) recentExpenses += amt;
        }
    });

    // Calculate balance accurately from transactions to guarantee sync between widgets
    const calculatedBalance = allTimeIncome - allTimeExpenses;

    const kpis = {
        totalBalance: { value: calculatedBalance, trend: 'Saldo Geral', isPositive: true },
        income: { value: recentIncome, trend: 'Últimos 7 dias', isPositive: true },
        expenses: { value: recentExpenses, trend: 'Últimos 7 dias', isPositive: false },
        savings: { value: 0, trend: '0.0%', isPositive: true }
    };

    const mainAccount = {
        id: 'acc_main',
        name: 'Main Account',
        balance: calculatedBalance,
        color: '#2563eb'
    };

    // Prepare chart data since backend has no dates
    const realChartData = [
        { name: 'Initial', income: 0, expense: 0 },
        { name: 'Current', income: allTimeIncome, expense: allTimeExpenses }
    ];

    // Prepare pie chart data (grouped by type)
    const categoryColors = {
        'deposit': '#4caf50',
        'withdrawn': '#f44336',
        'transfer': '#2196f3',
    };
    const typeSums = transactions.reduce((acc, t) => {
        acc[t.type] = (acc[t.type] || 0) + Math.abs(parseFloat(t.amount));
        return acc;
    }, {});
    const realCategoryData = Object.keys(typeSums).map(type => ({
        name: type.charAt(0).toUpperCase() + type.slice(1),
        value: typeSums[type],
        color: categoryColors[type] || '#999'
    }));

    return (
        <Box sx={{ pb: 4 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Dashboard
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" paragraph>
                Bem vindo de volta! aqui esta um resumo das suas finanças.
            </Typography>

            <Box sx={{ mt: 4, mb: 4 }}>
                <KPICards kpis={kpis} />
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 3, mb: 4 }}>
                <Box sx={{ minWidth: 0 }}>
                    <IncomeExpenseChart transactions={transactions} userId={user?.id} />
                </Box>
                <Box sx={{ minWidth: 0 }}>
                    <CategoryPieChart data={realCategoryData.length > 0 ? realCategoryData : [{ name: 'No Data', value: 1, color: '#ccc' }]} />
                </Box>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 3 }}>
                <Box sx={{ minWidth: 0 }}>
                    <RecentTransactionsPreview transactions={transactions} user={user} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
                    <Typography variant="h6" fontWeight="bold">
                        Your Accounts
                    </Typography>
                    <BalanceCard account={mainAccount} />
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;
