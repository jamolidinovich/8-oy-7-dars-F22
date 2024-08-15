import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import 'tailwindcss/tailwind.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      localStorage.setItem('authToken', username);
      navigate('/');
    } else {
      toast.error('Foydalanuvchi nomi yoki parol noto‘g‘ri');
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-800 text-white flex items-center justify-center">
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="../../../public/login.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative bg-gray-900 bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-extrabold mb-6 text-center">Login</h2>
        <Toaster />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="mb-4 w-full px-4 py-2 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-500"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mb-4 w-full px-4 py-2 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-500"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
        <Link
          to={'/register'}
          className="block  mt-4 text-blue-400 hover:text-blue-500"
        >
          Register
        </Link>
      </div>
    </div>
  );
}

export default Login;
