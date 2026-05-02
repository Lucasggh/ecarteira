import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Box, Typography } from '@mui/material';

const Charts = ({ data }) => {
    return (
        <Box sx={{ width: '100%', height: 350, p: 2 }}>
            <Typography variant="h6" gutterBottom>
                Weekly Income vs Expense
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                        formatter={(value) => `$${value}`}
                        contentStyle={{ borderRadius: 8 }}
                    />
                    <Legend />
                    <Bar dataKey="income" name="Income" fill="#4caf50" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="expense" name="Expense" fill="#f44336" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default Charts;
