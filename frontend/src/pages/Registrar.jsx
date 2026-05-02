import { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { isValidCPF } from "cnpj-cpf-validator";
import isEmail from "validator/lib/isEmail";

const Registrar = () => {
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        // Validações locais
        if (!isValidCPF(cpf)) {
            setError('CPF inválido');
            return;
        }
        if (!isEmail(email)) {
            setError('Email inválido');
            return;
        }
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password)) {
            setError('A senha deve conter 8+ caracteres, maiúscula, minúscula, número e especial.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3067/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, cpf, password, role: "user" })
            });
            const data = await response.json();
            
            if (response.ok) {
                // Redireciona para o login após criar a conta
                navigate('/login');
            } else {
                setError(data.message || data.err || 'Erro ao criar conta');
            }
        } catch (err) {
            setError('Erro ao conectar ao servidor');
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: 'background.default' }}>
            <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom textAlign="center">
                    Criar Conta
                </Typography>
                {error && <Typography color="error" textAlign="center" mb={2}>{error}</Typography>}
                <form onSubmit={handleRegister}>
                    <TextField
                        label="Nome"
                        type="text"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <TextField
                        label="CPF"
                        type="text"
                        fullWidth
                        margin="normal"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        required
                    />
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
                        label="Senha"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        helperText="8+ caracteres, maiúscula, minúscula, número e especial"
                    />
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, py: 1.5 }}>
                        Cadastrar
                    </Button>
                    <Box textAlign="center" mt={2}>
                        <Typography variant="body2" color="text.secondary">
                            Já tem uma conta?
                        </Typography>
                        <Button variant="text" onClick={() => navigate('/login')}>
                            Realizar login
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default Registrar;
