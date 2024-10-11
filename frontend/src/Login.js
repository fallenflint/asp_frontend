import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from './utils/api';
import { Box, Button, TextField, Typography, Link } from '@mui/material';


const LoginPage = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password , setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const credentials = {
      email: username,
      password: password
    };

    try {
      const response = await apiFetch('http://localhost/api/token/', {
        method: 'POST',
        body: JSON.stringify(credentials)
      });

      if (response.ok) {
        const data = await response.json();
        // localStorage.setItem('token', data.access);
        setIsAuthenticated(data.access);
        console.log('navigating to /');
        navigate('/');
        console.log('navigating to / chpok');
      } else {
        const errorData = await response.json();
        alert('Ошибка: ' + errorData.detail);
      }
    } catch (error) {
      alert('Произошла ошибка: ' + error.message);
    }
  };

  return (
     <Box
      sx={{
        width: 300,
        margin: 'auto',
        marginTop: '100px',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>

        <Typography variant="h6" gutterBottom>
          Почта/логин
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          placeholder="petrov@example.com"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Typography variant="h6" gutterBottom>
          Пароль
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          type="submit"
          sx={{
            backgroundColor: '#333',
            color: '#fff',
            marginTop: '20px',
          }}
        >
          Войти
        </Button>
      </form>

      <Link
        href="#"
        variant="body2"
        sx={{ display: 'block', textAlign: 'center', marginTop: '10px' }}
      >
        Забыли пароль?
      </Link>
    </Box>
  );
};

export default LoginPage;
