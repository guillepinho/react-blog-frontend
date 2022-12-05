// Logic Import
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
// MUI Import
import { Card, CardContent, TextField, Typography, Button, Snackbar, Alert } from '@mui/material'
import AppContext from '../context/AppContext';
// CSS Import

function Signup() {
  const navigate = useNavigate();
  const { setToken, setUser } = useContext(AppContext);
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    confPass: '',
    displayName: '',
  });
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  const inputHandler = ({ target }) => {
    const { value, name } = target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
    setOpen(false);
  };

  const { email, password, confPass, displayName } = newUser;

  const inputChecker = () => {
    if (
      email &&
      password.length > 5 &&
      password === confPass
    ) {
      return false;
    }
    return true;
  };

  const createUser = async () => {
    const { email, password, displayName } = newUser;

    const send = await fetch('http://localhost:3000/user', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, displayName }),
    });
    const result = await send.json();
    if (result.message) {
      setOpen(true);
      setError(result.message)
    } else {
      setToken(result.token);
      setUser(result.user.displayName);
      navigate('/');
    }
  };

  const handleClose = () => {
    setOpen(false);
    setError('');
  };

  return (
    <div className="login-page">
      <Card>
        <CardContent className="login-content">
          <Typography
            sx={{ fontSize: '1.5em' }}
            color="text.secondary"
          >
            Crie sua conta
          </Typography>
          <TextField
            id="outlined-basic"
            label="Insira seu e-mail"
            required
            name="email"
            value={email}
            onChange={inputHandler}
          />
          <TextField
            id="outlined-basic"
            label="Insira seu nome"
            required
            name="displayName"
            value={displayName}
            onChange={inputHandler}
          />
          <TextField
            id="outlined-basic"
            label="Cria a senha"
            required
            name="password"
            type="password"
            value={password}
            onChange={inputHandler}
          />
          <TextField
            id="outlined-basic"
            label="Repita a senha"
            required
            name="confPass"
            type="password"
            value={confPass}
            onChange={inputHandler}
          />
          <Button
            variant="contained"
            disabled={inputChecker()}
            onClick={createUser}
          >
            Criar
          </Button>
        </CardContent>
      </Card>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        key={'topcenter'}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity="error"
          onClose={handleClose}
          sx={{ width: '250px' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Signup;