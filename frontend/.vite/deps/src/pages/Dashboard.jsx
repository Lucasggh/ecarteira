import React from 'react';
import { Typography, Box } from '@mui/material';
import KPICards from '../components/KPICards';
import IncomeExpenseChart from '../components/IncomeExpenseChart';
import CategoryPieChart from '../components/CategoryPieChart';
import RecentTransactionsPreview from '../components/RecentTransactionsPreview';
import { mockKPIs, mockChartData, mockCategoryData, mockTransactions, mockBalance } from '../data/mockData';
import BalanceCard from '../components/BalanceCard'; // Keep it for the side

const Dashboard = () => {
    return (
        <Box sx={{ pb: 4 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Dashboard
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" paragraph>
                Bem vindo de volta! aqui esta um resumo das suas finanças.
            </Typography>

            <Box sx={{ mt: 4, mb: 4 }}>
                <KPICards kpis={mockKPIs} />
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 3, mb: 4 }}>
                <Box sx={{ minWidth: 0 }}>
                    <IncomeExpenseChart data={mockChartData} />
                </Box>
                <Box sx={{ minWidth: 0 }}>
                    <CategoryPieChart data={mockCategoryData} />
                </Box>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 3 }}>
                <Box sx={{ minWidth: 0 }}>
                    <RecentTransactionsPreview transactions={mockTransactions} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
                    <Typography variant="h6" fontWeight="bold">
                        Your Accounts
                    </Typography>
                    {mockBalance.accounts.map((account) => (
                        <BalanceCard key={account.id} account={account} />
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;
