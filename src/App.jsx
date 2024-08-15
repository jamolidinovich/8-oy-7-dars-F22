// src/App.js
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ProductDetails from './components/ProductDetails/ProductDetails';
import PrivateRoute from './components/ProtectedRoutes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <PrivateRoute element={<Home />} /> },
      { path: 'about', element: <PrivateRoute element={<About />} /> },
      { path: 'contact', element: <PrivateRoute element={<Contact />} /> },
      {
        path: 'product/:productId',
        element: <PrivateRoute element={<ProductDetails />} />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
