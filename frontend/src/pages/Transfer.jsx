import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Alert, MenuItem } from '@mui/material';
import { transfer } from '../api';
import { useAuth } from '../context/AuthContext';

const Transfer = () => {
    const { token } = useAuth();
    const [receiverId, setReceiverId] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('Sem Categoria');
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleTransfer = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });
        try {
            await transfer(token, {
                receiver_id: receiverId,
                amount: parseFloat(amount),
                category,
            });
            setMessage({ type: 'success', text: 'Transfer successful!' });
            setReceiverId('');
            setAmount('');
            setCategory('Sem Categoria');
        } catch (err) {
            setMessage({ type: 'error', text: err.message || 'Transfer failed.' });
        }
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Transfer Funds
            </Typography>
            <Paper elevation={3} sx={{ p: 4, mt: 3, borderRadius: 3 }}>
                {message.text && (
                    <Alert severity={message.type} sx={{ mb: 3 }}>
                        {message.text}
                    </Alert>
                )}
                <form onSubmit={handleTransfer}>
                    <TextField
                        label="Receiver ID"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={receiverId}
                        onChange={(e) => setReceiverId(e.target.value)}
                        required
                    />
                    <TextField
                        label="Amount ($)"
                        type="number"
                        inputProps={{ step: "0.01", min: "0.01" }}
                        fullWidth
                        margin="normal"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                    <TextField
                        select
                        label="Category"
                        fullWidth
                        margin="normal"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <MenuItem value="Sem Categoria">General Transfer</MenuItem>
                        <MenuItem value="Pagamento">Payment</MenuItem>
                        <MenuItem value="Presente">Gift</MenuItem>
                        <MenuItem value="Doação">Donation</MenuItem>
                    </TextField>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 4, py: 1.5, borderRadius: 2, fontWeight: 'bold' }}
                    >
                        Send Transfer
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default Transfer;
