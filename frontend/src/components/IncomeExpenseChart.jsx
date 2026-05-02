import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { Box, Typography } from '@mui/material';

// Builds a 7-day daily total array from raw transactions
const build7DayData = (transactions, userId) => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        days.push({
            label: d.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit' }),
            dateStr: d.toISOString().slice(0, 10),
            income: 0,
            expense: 0,
        });
    }

    transactions.forEach(t => {
        const txDate = new Date(t.date).toISOString().slice(0, 10);
        const day = days.find(d => d.dateStr === txDate);
        if (!day) return;

        const amt = Math.abs(parseFloat(t.amount));
        const isIncomeTx =
            t.type === 'deposit' ||
            (t.type === 'transfer' && t.receiver_id === userId);
        const isExpenseTx =
            t.type === 'withdrawn' ||
            t.type === 'withdraw' ||
            (t.type === 'transfer' && t.sender_id === userId);

        if (isIncomeTx) day.income += amt;
        if (isExpenseTx) day.expense += amt;
    });

    return days.map(d => ({ name: d.label, income: d.income, expense: d.expense }));
};

const IncomeExpenseChart = ({ transactions, userId }) => {
    const chartData = build7DayData(transactions || [], userId);

    return (
        <Box sx={{ width: '100%', height: 350, p: 2, bgcolor: 'background.paper', borderRadius: 3, boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                Cash Flow — Últimos 7 dias
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        barCategoryGap="30%"
                        barGap={4}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#888', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#888', fontSize: 12 }}
                            tickFormatter={(value) => `$${value.toFixed(0)}`}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            formatter={(value) => `$${value.toFixed(2)}`}
                        />
                        <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                        <Bar dataKey="income" name="Receita" fill="#4caf50" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="expense" name="Despesa" fill="#f44336" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
};

export default IncomeExpenseChart;
