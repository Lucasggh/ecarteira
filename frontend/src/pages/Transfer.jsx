import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Alert, MenuItem } from '@mui/material';
import { transfer } from '../api';
import { useAuth } from '../context/AuthContext';

const Transfer = () => {
    const { token } = useAuth();
    const [receiverId, setReceiverId] = useState('');
    const [amount, setAmount] = useState('');
    const [classification, setClassification] = useState('Transfer');
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleTransfer = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });
        try {
            await transfer(token, {
                receiver_id: receiverId,
                amount: parseFloat(amount),
            });
            setMessage({ type: 'success', text: 'Transfer successful!' });
            setReceiverId('');
            setAmount('');
            setClassification('Transfer');
        } catch (err) {
            setMessage({ type: 'error', text: 'Transfer failed.' });
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
                        inputProps={{ step: "0.01", min: "0" }}
                        fullWidth
                        margin="normal"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                    <TextField
                        select
                        label="Classification"
                        fullWidth
                        margin="normal"
                        value={classification}
                        onChange={(e) => setClassification(e.target.value)}
                    >
                        <MenuItem value="Transfer">General Transfer</MenuItem>
                        <MenuItem value="Payment">Payment</MenuItem>
                        <MenuItem value="Gift">Gift</MenuItem>
                        <MenuItem value="Donation">Donation</MenuItem>
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
