import React from 'react';
import { Box, Card, CardContent, Typography, useTheme } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CallMadeIcon from '@mui/icons-material/CallMade';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import SavingsIcon from '@mui/icons-material/Savings';

const KPICard = ({ title, value, trend, isPositive, icon, color }) => {
    const theme = useTheme();
    const isUp = trend && trend.startsWith('+');

    return (
        <Card sx={{ 
            height: '100%', 
            borderRadius: 3, 
            boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
            borderLeft: `4px solid ${color}`,
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
                transform: 'translateY(-4px)'
            }
        }}>
            <CardContent sx={{ p: 3 }}>
                <Box display="flex" justifyContent="space-between" mb={2}>
                    <Box 
                        sx={{ 
                            backgroundColor: `${color}15`, 
                            p: 1.5, 
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {React.cloneElement(icon, { sx: { color: color } })}
                    </Box>
                    {trend && (
                        <Box display="flex" alignItems="center" 
                            sx={{ 
                                color: isPositive ? theme.palette.success.main : theme.palette.error.main,
                                backgroundColor: isPositive ? `${theme.palette.success.main}1A` : `${theme.palette.error.main}1A`,
                                px: 1,
                                py: 0.5,
                                borderRadius: '12px',
                                typography: 'caption',
                                fontWeight: 'bold'
                            }}
                        >
                            {isUp ? <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} /> : <TrendingDownIcon fontSize="small" sx={{ mr: 0.5 }} />}
                            {trend}
                        </Box>
                    )}
                </Box>
                <Typography variant="body2" color="text.secondary" fontWeight="medium" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                    ${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </Typography>
            </CardContent>
        </Card>
    );
};

const KPICards = ({ kpis }) => {
    const theme = useTheme();

    return (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 3 }}>
            <Box sx={{ minWidth: 0 }}>
                <KPICard 
                    title="Total Balance" 
                    value={kpis.totalBalance.value} 
                    trend={kpis.totalBalance.trend}
                    isPositive={kpis.totalBalance.isPositive} // Usually up is good
                    icon={<AccountBalanceWalletIcon />} 
                    color={theme.palette.primary.main} 
                />
            </Box>
            <Box sx={{ minWidth: 0 }}>
                <KPICard 
                    title="Total Income" 
                    value={kpis.income.value} 
                    trend={kpis.income.trend}
                    isPositive={kpis.income.isPositive} // Up is good
                    icon={<CallReceivedIcon />} 
                    color={theme.palette.success.main} 
                />
            </Box>
            <Box sx={{ minWidth: 0 }}>
                <KPICard 
                    title="Total Expenses" 
                    value={kpis.expenses.value} 
                    trend={kpis.expenses.trend}
                    isPositive={kpis.expenses.isPositive} // Down is good, so positive true = green trend but maybe visually we want it differently. Let's stick to true=good.
                    icon={<CallMadeIcon />} 
                    color={theme.palette.error.main} 
                />
            </Box>
            <Box sx={{ minWidth: 0 }}>
                <KPICard 
                    title="Total Savings" 
                    value={kpis.savings.value} 
                    trend={kpis.savings.trend}
                    isPositive={kpis.savings.isPositive} // Up is good
                    icon={<SavingsIcon />} 
                    color={theme.palette.info.main} 
                />
            </Box>
        </Box>
    );
};

export default KPICards;
