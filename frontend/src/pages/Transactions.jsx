import React, { useEffect, useState } from 'react';
import { Typography, Box, CircularProgress, Alert } from '@mui/material';
import TransactionTable from '../components/TransactionTable';
import { fetchTransactions } from '../api';
import { useAuth } from '../context/AuthContext';

const Transactions = () => {
    const { token, user } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadTransactions = async () => {
            try {
                const data = await fetchTransactions(token);
                setTransactions(data.transactions || []);
            } catch (err) {
                setError('Failed to load transactions.');
            } finally {
                setLoading(false);
            }
        };
        loadTransactions();
    }, [token]);

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Transaction History
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" paragraph>
                Veja o historico de todas as suas transações.
            </Typography>

            <Box sx={{ mt: 4 }}>
                <TransactionTable transactions={transactions} user={user} />
            </Box>
        </Box>
    );
};

export default Transactions;
