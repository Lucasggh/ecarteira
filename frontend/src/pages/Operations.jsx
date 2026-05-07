import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Alert, Grid } from '@mui/material';
import { deposit, withdraw } from '../api';
import { useAuth } from '../context/AuthContext';

const Operations = () => {
    const { token } = useAuth();
    const [depositAmount, setDepositAmount] = useState('');
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleDeposit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });
        try {
            await deposit(token, { amount: parseFloat(depositAmount), category: 'Depósito' });
            setMessage({ type: 'success', text: 'Depósito realizado com sucesso!' });
            setDepositAmount('');
        } catch (err) {
            setMessage({ type: 'error', text: err.message || 'Falha no depósito.' });
        }
    };

    const handleWithdraw = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });
        try {
            await withdraw(token, { amount: parseFloat(withdrawAmount), category: 'Saque' });
            setMessage({ type: 'success', text: 'Saque realizado com sucesso!' });
            setWithdrawAmount('');
        } catch (err) {
            setMessage({ type: 'error', text: err.message || 'Falha no saque.' });
        }
    };

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Deposit & Withdraw
            </Typography>
            {message.text && (
                <Alert severity={message.type} sx={{ mb: 3 }}>
                    {message.text}
                </Alert>
            )}
            <Grid container spacing={4} sx={{ mt: 1 }}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 4, borderRadius: 3, height: '100%' }}>
                        <Typography variant="h5" fontWeight="bold" color="success.main" gutterBottom>
                            Deposit
                        </Typography>
                        <form onSubmit={handleDeposit}>
                            <TextField
                                label="Amount ($)"
                                type="number"
                                inputProps={{ step: "0.01", min: "0.01" }}
                                fullWidth
                                margin="normal"
                                value={depositAmount}
                                onChange={(e) => setDepositAmount(e.target.value)}
                                required
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="success"
                                fullWidth
                                sx={{ mt: 3, py: 1.5, borderRadius: 2, fontWeight: 'bold' }}
                            >
                                Confirm Deposit
                            </Button>
                        </form>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 4, borderRadius: 3, height: '100%' }}>
                        <Typography variant="h5" fontWeight="bold" color="error.main" gutterBottom>
                            Withdraw
                        </Typography>
                        <form onSubmit={handleWithdraw}>
                            <TextField
                                label="Amount ($)"
                                type="number"
                                inputProps={{ step: "0.01", min: "0.01" }}
                                fullWidth
                                margin="normal"
                                value={withdrawAmount}
                                onChange={(e) => setWithdrawAmount(e.target.value)}
                                required
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="error"
                                fullWidth
                                sx={{ mt: 3, py: 1.5, borderRadius: 2, fontWeight: 'bold' }}
                            >
                                Confirm Withdrawal
                            </Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Operations;
