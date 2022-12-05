// Logic Import
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// Component Import

// MUI Import
import { Card, CardContent, TextField, Typography, Button, ButtonGroup, Alert, Snackbar } from '@mui/material'
import AppContext from '../context/AppContext';
// CSS Import


function SignIn() {
  const navigate = useNavigate();
  const { setToken, setUser } = useContext(AppContext);
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(false);
  const [errorTxt, setErrorTxt] = useState('');

  const inputHandler = ({ target }) => {
    const { value, name } = target;
    setLogin({
      ...login,
      [name]: value,
    })
    setError(false);
    setErrorTxt('');
  };

  const inputChecker = () => {
    const { email, password } = login;
    if (email && password.length > 1) {
      return false;
    }
    return true;
  }

  const logIn = async () => {
    const { email, password } = login;

    const send = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }),
    });
    const result = await send.json();
    if (result.message) {
      setError(true);
      setErrorTxt(result.message);
    } else {
      setToken(result.token);
      setUser(result.user.displayName);
      navigate('/');
    }
  }

  const { email, password } = login;

  return (
    <div className="login-page">
      <Card>
        <CardContent className="login-content">
          <Typography
            sx={{ fontSize: '1.5em' }}
            color="text.secondary"
          >
            BLOG API
          </Typography>
          <TextField
            id="outlined-basic"
            label="E-mail"
            required
            name="email"
            value={email}
            onChange={inputHandler}
          />
          <TextField
            id="outlined-basic"
            label="Senha"
            required
            name="password"
            type="password"
            value={password}
            onChange={inputHandler}
          />
          <ButtonGroup>
            <Button
              variant="contained"
              onClick={logIn}
              disabled={inputChecker()}
            >
              Acessar
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate('/signup') }
            >
              Criar Conta
            </Button>
          </ButtonGroup>
        </CardContent>
      </Card>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={() => setError(false)}
        key={'topcenter'}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity="error"
          onClose={() => setError(false)}
          sx={{ width: '250px' }}
        >
          {errorTxt}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SignIn;