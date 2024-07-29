import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';
import './common.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    usernameError: '',
    firstNameError: '',
    lastNameError: '',
    emailError: '',
    passwordError: '',
    confirmPasswordError: ''
  });

  const navigate = useNavigate();

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setErrors({
      usernameError: '',
      firstNameError: '',
      lastNameError: '',
      emailError: '',
      passwordError: '',
      confirmPasswordError: ''
    });

    const { username, firstName, lastName, email, password, confirmPassword } = formData;
    let hasErrors = false;

    if (!username) {
      setErrors(prev => ({ ...prev, usernameError: 'Username is required' }));
      hasErrors = true;
    }

    if (!firstName) {
      setErrors(prev => ({ ...prev, firstNameError: 'First name is required' }));
      hasErrors = true;
    }

    if (!lastName) {
      setErrors(prev => ({ ...prev, lastNameError: 'Last name is required' }));
      hasErrors = true;
    }

    if (!email) {
      setErrors(prev => ({ ...prev, emailError: 'Email is required' }));
      hasErrors = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors(prev => ({ ...prev, emailError: 'Invalid email address' }));
      hasErrors = true;
    }

    if (!password) {
      setErrors(prev => ({ ...prev, passwordError: 'Password is required' }));
      hasErrors = true;
    } else if (password.length < 8) {
      setErrors(prev => ({ ...prev, passwordError: 'Password must be 8 characters or longer' }));
      hasErrors = true;
    }

    if (password !== confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPasswordError: 'Passwords do not match' }));
      hasErrors = true;
    }

    if (!hasErrors) {
      // Handle successful registration here
      navigate('/welcome'); // Replace '/welcome' with your desired route
    }
  };

  return (
    <div className="register-box">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="user-box">
          <input
            type="text"
            name="username"
            value={formData.username}
            placeholder="Username"
            onChange={handleChange}
            className="inputField"
          />
          <label className="errorLabel">{errors.usernameError}</label>
        </div>
        <div className="user-box">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            placeholder="First Name"
            onChange={handleChange}
            className="inputField"
          />
          <label className="errorLabel">{errors.firstNameError}</label>
        </div>
        <div className="user-box">
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            placeholder="Last Name"
            onChange={handleChange}
            className="inputField"
          />
          <label className="errorLabel">{errors.lastNameError}</label>
        </div>
        <div className="user-box">
          <input
            type="text"
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleChange}
            className="inputField"
          />
          <label className="errorLabel">{errors.emailError}</label>
        </div>
        <div className="user-box">
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            onChange={handleChange}
            className="inputField"
          />
          <label className="errorLabel">{errors.passwordError}</label>
        </div>
        <div className="user-box">
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            placeholder="Confirm Password"
            onChange={handleChange}
            className="inputField"
          />
          <label className="errorLabel">{errors.confirmPasswordError}</label>
        </div>
        <button className="inputButton" type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
