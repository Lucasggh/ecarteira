import React from 'react';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Typography, Box, Chip, Avatar
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import HomeIcon from '@mui/icons-material/Home';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import WorkIcon from '@mui/icons-material/Work';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

// Helper to pick an icon based on category
const getCategoryIcon = (category) => {
    switch(category) {
        case 'Food': return <FastfoodIcon fontSize="small" />;
        case 'Housing': return <HomeIcon fontSize="small"  />;
        case 'Transport': return <DirectionsCarIcon fontSize="small" />;
        case 'Health': return <FitnessCenterIcon fontSize="small" />;
        case 'Salary':
        case 'Side Hustle': return <WorkIcon fontSize="small" />;
        default: return <ShoppingCartIcon fontSize="small" />;
    }
};

const getCategoryColor = (category, type) => {
    if (type === 'income') return '#e8f5e9';
    switch(category) {
        case 'Food': return '#ffebee';
        case 'Housing': return '#e3f2fd';
        case 'Transport': return '#e0f7fa';
        case 'Health': return '#fff8e1';
        default: return '#f5f5f5';
    }
};

const getCategoryIconColor = (category, type) => {
    if (type === 'income') return '#4caf50';
    switch(category) {
        case 'Food': return '#f44336';
        case 'Housing': return '#2196f3';
        case 'Transport': return '#00bcd4';
        case 'Health': return '#ffc107';
        default: return '#9e9e9e';
    }
};

const TransactionTable = ({ transactions }) => {
    return (
        <TableContainer component={Paper} elevation={0} sx={{ border: 1, borderColor: 'divider', borderRadius: 3 }}>
            <Table sx={{ minWidth: 650 }} aria-label="transactions table">
                <TableHead sx={{ bgcolor: 'background.default' }}>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Date</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Description</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary', pl: 0 }}>Category</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Type</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ 
                                '&:last-child td, &:last-child th': { border: 0 },
                                '&:hover': { bgcolor: 'action.hover' },
                                transition: 'background-color 0.2s'
                            }}
                        >
                            <TableCell component="th" scope="row">
                                {new Date(row.date).toLocaleDateString()}
                            </TableCell>
                            <TableCell sx={{ fontWeight: 500 }}>
                                <Box display="flex" alignItems="center" gap={1.5}>
                                    <Avatar sx={{ 
                                        width: 32, 
                                        height: 32, 
                                        bgcolor: getCategoryColor(row.category, row.type), 
                                        color: getCategoryIconColor(row.category, row.type),
                                        borderRadius: '8px'
                                    }}>
                                        {getCategoryIcon(row.category)}
                                    </Avatar>
                                    {row.description}
                                </Box>
                            </TableCell>
                            <TableCell sx={{ pl: 0 }}>
                                <Chip 
                                    label={row.category || 'Other'} 
                                    size="small" 
                                    variant="outlined"
                                    sx={{ borderRadius: '6px', fontWeight: 500 }}
                                />
                            </TableCell>
                            <TableCell align="center">
                                <Chip
                                    label={row.type === 'income' ? 'Income' : 'Expense'}
                                    sx={{ 
                                        bgcolor: row.type === 'income' ? '#e8f5e9' : '#ffebee',
                                        color: row.type === 'income' ? '#2e7d32' : '#c62828',
                                        fontWeight: 'bold',
                                        borderRadius: '6px'
                                    }}
                                    size="small"
                                />
                            </TableCell>
                            <TableCell
                                align="right"
                                sx={{
                                    color: row.type === 'income' ? 'success.main' : 'text.primary',
                                    fontWeight: 'bold'
                                }}
                            >
                                {row.type === 'income' ? '+' : ''}
                                {Math.abs(row.amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                            </TableCell>
                        </TableRow>
                    ))}
                    {transactions.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={5} align="center">
                                <Box py={4}>
                                    <Typography variant="body1" color="text.secondary">
                                        No transactions found.
                                    </Typography>
                                </Box>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TransactionTable;
