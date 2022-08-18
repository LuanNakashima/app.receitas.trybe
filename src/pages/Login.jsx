import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../Context/Context';
import logo from '../images/logo.png';
import '../CSS/Login.css'

import Button from 'react-bootstrap/Button';

function Login() {
  const {
    setEmail,
    setPassword,
    email,
    password } = useContext(Context);

  const num = 6;

  const jsonObj = JSON.stringify({ email });

  const history = useHistory();

  function btnEnter() {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', jsonObj);
    history.push('/foods');
  }

  const validateEmail = () => (email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/));

  const validatePassword = () => password.length > num;

  return (
    <main className="main-login">
      <img src={ logo } alt="logo" className="img-logo" />
      <h1 className="loginH1">Login</h1>
      <form className="form">
        <input
          className="input-login"
          type="email"
          data-testid="email-input"
          placeholder="E-mail"
          onChange={ (e) => setEmail(e.target.value) }
        />
        <input
          className="input-login"
          type="password"
          data-testid="password-input"
          placeholder="Password"
          onChange={ (e) => setPassword(e.target.value) }
        />
        <Button
          disabled={ !(validateEmail() && validatePassword()) }
          type="submit"
          data-testid="login-submit-btn"
          onClick={ btnEnter }
          className="btn-login"
          variant="primary"
        >
          Enter
        </Button>
      </form>
    </main>
  );
}

export default Login;
