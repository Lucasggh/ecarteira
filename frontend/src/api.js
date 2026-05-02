const API_URL = import.meta.env.VITE_API_URL || 'https://ecarteira.onrender.com/api';

async function handleResponse(res) {
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || data.message || 'Request failed');
    return data;
}

export const loginUser = async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    return handleResponse(res);
};

export const registerUser = async (payload) => {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    return handleResponse(res);
};

export const fetchBalance = async (token) => {
    const res = await fetch(`${API_URL}/transactions/balance`, {
        headers: { 'Authorization': `Bearer ${token}` },
    });
    return handleResponse(res);
};

export const fetchTransactions = async (token) => {
    const res = await fetch(`${API_URL}/transactions/`, {
        headers: { 'Authorization': `Bearer ${token}` },
    });
    return handleResponse(res);
};

export const transfer = async (token, payload) => {
    const res = await fetch(`${API_URL}/transactions/transfer`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
    return handleResponse(res);
};

export const deposit = async (token, payload) => {
    const res = await fetch(`${API_URL}/transactions/deposit`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
    return handleResponse(res);
};

export const withdraw = async (token, payload) => {
    const res = await fetch(`${API_URL}/transactions/withdrawn`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
    return handleResponse(res);
};
