import React from 'react';
import { Typography, Box } from '@mui/material';
import TransactionTable from '../components/TransactionTable';
import { mockTransactions } from '../data/mockData';

const Transactions = () => {
    return (
        <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Transaction History
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" paragraph>
                Veja o historico de todas as suas transações.
            </Typography>

            <Box sx={{ mt: 4 }}>
                <TransactionTable transactions={mockTransactions} />
            </Box>
        </Box>
    );
};

export default Transactions;
