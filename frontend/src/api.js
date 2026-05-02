const API_URL = 'https://ecarteira.onrender.com/api';

export const fetchBalance = async (token) => {
    const res = await fetch(`${API_URL}/transactions/balance`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to fetch balance');
    return res.json();
};

export const fetchTransactions = async (token) => {
    const res = await fetch(`${API_URL}/transactions/`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to fetch transactions');
    return res.json();
};

export const transfer = async (token, payload) => {
    const res = await fetch(`${API_URL}/transactions/transfer`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Failed to transfer');
    return res.json();
};

export const deposit = async (token, payload) => {
    const res = await fetch(`${API_URL}/transactions/deposit`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Failed to deposit');
    return res.json();
};

export const withdraw = async (token, payload) => {
    const res = await fetch(`${API_URL}/transactions/withdrawn`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Failed to withdraw');
    return res.json();
};
