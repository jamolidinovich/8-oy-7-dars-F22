import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const authToken = localStorage.getItem('authToken');
    localStorage.removeItem('authToken');
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.filter((user) => user.username !== authToken);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    navigate('/login');
  };

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout} className="btn btn-primary">
        Logout
      </button>
    </div>
  );
}

export default Logout;
