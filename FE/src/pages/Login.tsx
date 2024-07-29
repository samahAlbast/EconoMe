import { useState } from 'react';
import './login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const onButtonClick = () => {
    setUsernameError('');
    setPasswordError('');

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

    // Handle successful login here
  };

  return (
    <div className="login-box">
      <h2>Login</h2>
      <form>
        <div className="input-container">
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(ev) => setUsername(ev.target.value)}
          />
          <label className="errorLabel">{usernameError}</label>
        </div>
        <div className="input-container">
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <label className="errorLabel">{passwordError}</label>
        </div>
        
        <input
          onClick={onButtonClick}
          className="inputButton"
          type="button"
          value="Submit"
        />
      </form>
    </div>
  );
};

export default Login;
