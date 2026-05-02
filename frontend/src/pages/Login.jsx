import { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch('https://ecarteira.onrender.com/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                login(data.user, data.token);
            } else {
                setError(data.message || data.error || 'Login failed');
            }
        } catch (err) {
            setError('Error connecting to server');
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: 'background.default' }}>
            <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom textAlign="center">
                    Banquexx Login
                </Typography>
                {error && <Typography color="error" textAlign="center" mb={2}>{error}</Typography>}
                <form onSubmit={handleLogin}>
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, py: 1.5 }}>
                        Login
                    </Button>
                    <Box textAlign="center" mt={2}>
                        <Typography variant="body2" color="text.secondary">
                            Não tem uma conta?
                        </Typography>
                        <Button variant="text" onClick={() => navigate('/register')}>
                            Criar conta
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default Login;
