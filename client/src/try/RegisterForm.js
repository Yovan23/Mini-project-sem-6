// RegisterForm.js

import React, { useState } from 'react';

const RegisterForm = ({ handleRegister }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('franchisee'); // Default role is 'franchisee'

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister({ username, email, password, role }); // Include role in the registration request
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="franchisee">Franchisee</option>
            <option value="admin">Admin</option>
            <option value="superadmin">Superadmin</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
