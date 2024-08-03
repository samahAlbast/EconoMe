import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { login } from '../../services/userService'; // Import the login service
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const onButtonClick = async () => {
    setUsernameError('');
    setPasswordError('');
    setGeneralError('');
    setSuccessMessage('');

    if (username === '') {
      setUsernameError('Please enter your username');
      return;
    }

    if (password === '') {
      setPasswordError('Please enter a password');
      return;
    }

    if (password.length < 8) {
      setPasswordError('Password must be 8 characters or longer');
      return;
    }

    try {
      const data = await login(username, password);
      localStorage.setItem('authToken', data.token);
      setSuccessMessage(data.message);
      navigate('/income');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setGeneralError(error.response?.data.message || 'An error occurred during login');
      } else {
        setGeneralError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="login-box">
      <h2>Login</h2>
      {generalError && <div className="error">{generalError}</div>}
      {successMessage && <div className="successMessage">{successMessage}</div>}
      <form>
        <div className="input-container">
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(ev) => setUsername(ev.target.value)}
          />
          <label className="error">{usernameError}</label>
        </div>
        <div className="input-container">
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <label className="error">{passwordError}</label>
        </div>
        <div className="button-container">
          <input
            onClick={onButtonClick}
            className="inputButton"
            type="button"
            value="Submit"
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
