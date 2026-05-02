import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const BalanceCard = ({ account }) => {
    return (
        <Card
            elevation={2}
            sx={{
                borderLeft: `6px solid ${account.color || '#1976d2'}`,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}
        >
            <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    {account.name}
                </Typography>
                <Typography variant="h4" component="div" fontWeight="bold">
                    ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default BalanceCard;
