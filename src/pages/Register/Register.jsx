import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import 'tailwindcss/tailwind.css';

function Register() {
  const [username, setUsername] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleRegister = () => {
    if (!username || !imgUrl || !email || !password) {
      toast.error('Barcha maydonlarni tuldirish shart!');
      return;
    }

    if (username.length < 3) {
      toast.error(
        "Foydalanuvchi nomi kamida 3 ta belgidan iborat bo'lishi kerak!"
      );
      return;
    }

    if (imgUrl.length < 3) {
      toast.error(
        'Rasm URL manzili kamida 3 ta belgidan iborat boʻlishi kerak!'
      );
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Iltimos, to'g'ri e-pochta manzilini kiriting!");
      return;
    }

    if (password.length < 6) {
      toast.error("Parol kamida 6 ta belgidan iborat bo'lishi kerak!");
      return;
    }
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = existingUsers.some(
      (user) => user.username === username || user.email === email
    );

    if (userExists) {
      toast.error(
        'Foydalanuvchi nomi yoki e-pochta manzili allaqachon mavjud!'
      );
      return;
    }
    const newUser = { username, imgUrl, email, password };
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('authToken', username);
    toast.success("Muvaffaqiyatli ro'yxatdan o'tdingiz!");
    navigate('/login');
  };

  return (
    <div className="relative min-h-screen  bg-gray-800 text-white flex items-center justify-center">
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="../../../public/register.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative bg-gray-900 bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-extrabold mb-6 text-center">Register</h2>
        <Toaster />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="mb-4 w-full px-4 py-2 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-500"
        />
        <input
          type="text"
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
          placeholder="Image URL"
          className="mb-4 w-full px-4 py-2 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-500"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
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
          onClick={handleRegister}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Register
        </button>
        <Link
          to={'/login'}
          className="block  mt-4 text-blue-400 hover:text-blue-500"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default Register;
