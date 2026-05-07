import React from 'react';
import { 
    Box, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider, Button 
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import HomeIcon from '@mui/icons-material/Home';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import WorkIcon from '@mui/icons-material/Work';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useNavigate } from 'react-router-dom';

// Helper to pick an icon based on category
const getCategoryIcon = (category) => {
    switch(category) {
        case 'Food':
        case 'Alimentação': return <FastfoodIcon />;
        case 'Housing':
        case 'Aluguel': return <HomeIcon />;
        case 'Transport':
        case 'Transporte': return <DirectionsCarIcon />;
        case 'Health':
        case 'Saúde': return <FitnessCenterIcon />;
        case 'Salary':
        case 'Side Hustle': return <WorkIcon />;
        case 'Lazer': return <FitnessCenterIcon />; // Using Fitness as proxy for leisure/activities
        case 'Educação': return <WorkIcon />; // Using Work/Portfolio as proxy for education
        case 'Depósito': return <AttachMoneyIcon />;
        case 'Saque': return <AttachMoneyIcon />;
        default: return <ShoppingCartIcon />;
    }
};

const getCategoryColor = (category, type) => {
    if (type === 'income') return '#e8f5e9'; // light green
    switch(category) {
        case 'Food':
        case 'Alimentação': return '#ffebee'; // light red
        case 'Housing':
        case 'Aluguel': return '#e3f2fd'; // light blue
        case 'Transport':
        case 'Transporte': return '#e0f7fa'; // cyan
        case 'Health':
        case 'Saúde': return '#fff8e1'; // amber
        case 'Depósito': return '#e8f5e9'; // light green
        case 'Saque': return '#ffebee'; // light red
        default: return '#f5f5f5'; // grey
    }
};

const getCategoryIconColor = (category, type) => {
    if (type === 'income') return '#4caf50';
    switch(category) {
        case 'Food':
        case 'Alimentação': return '#f44336';
        case 'Housing':
        case 'Aluguel': return '#2196f3';
        case 'Transport':
        case 'Transporte': return '#00bcd4';
        case 'Health':
        case 'Saúde': return '#ffc107';
        case 'Depósito': return '#4caf50';
        case 'Saque': return '#f44336';
        default: return '#9e9e9e';
    }
};

const RecentTransactionsPreview = ({ transactions, user }) => {
    const navigate = useNavigate();
    // Only show top 5
    const recentTx = transactions.slice(0, 5);

    return (
        <Box sx={{ 
            width: '100%', 
            p: 3, 
            bgcolor: 'background.paper', 
            borderRadius: 3, 
            boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
        }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight="bold">
                    Recent Transactions
                </Typography>
                <Button 
                    size="small" 
                    color="primary" 
                    onClick={() => navigate('/transactions')}
                    sx={{ textTransform: 'none', fontWeight: 'bold' }}
                >
                    View All
                </Button>
            </Box>
            
            <List sx={{ width: '100%', bgcolor: 'background.paper', p: 0, flexGrow: 1 }}>
                {recentTx.map((tx, index) => {
                    const isIncome = tx.type === 'deposit' || (tx.type === 'transfer' && user && tx.receiver_id === user.id);
                    return (
                        <React.Fragment key={tx.id}>
                            <ListItem sx={{ px: 0, py: 1.5 }}>
                                <ListItemAvatar>
                                    <Avatar sx={{ 
                                        bgcolor: getCategoryColor(tx.category, tx.type), 
                                        color: getCategoryIconColor(tx.category, tx.type),
                                        borderRadius: '12px'
                                    }}>
                                        {getCategoryIcon(tx.category)}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText 
                                    primary={<Typography variant="subtitle2" fontWeight="bold">{tx.category || tx.type}</Typography>} 
                                    secondary={<Typography variant="caption" color="text.secondary">{new Date(tx.date).toLocaleDateString()} • {tx.type}</Typography>} 
                                />
                                <Typography 
                                    variant="subtitle2" 
                                    fontWeight="bold"
                                    color={isIncome ? 'success.main' : 'text.primary'}
                                >
                                    {isIncome ? '+' : ''}{Math.abs(parseFloat(tx.amount)).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                </Typography>
                            </ListItem>
                            {index < recentTx.length - 1 && <Divider component="li" />}
                        </React.Fragment>
                    );
                })}
            </List>
        </Box>
    );
};

export default RecentTransactionsPreview;
