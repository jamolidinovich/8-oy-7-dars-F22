import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Navbar({
  searchQuery,
  handleSearchChange,
  selectedCategory,
  handleCategoryChange,
  categories,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const authToken = localStorage.getItem('authToken');
    const currentUser =
      storedUsers.find((user) => user.username === authToken) || {};
    setUser(currentUser);
  }, []);

  const avatarUrl =
    user.imgUrl ||
    'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp';
  const Name = user.username || 'Guest';

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('users');
    setUser({});
    navigate('/login');
  };

  return (
    <div
      style={{ maxWidth: '1240px', marginLeft: 'auto', marginRight: 'auto' }}
    >
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
          </div>
          <a className="btn btn-ghost text-xl" href="/">
            Market
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-8 mr-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'btn bg-[#7A777A] text-white' : 'btn'
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? 'btn bg-[#7A777A] text-white' : 'btn'
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? 'btn bg-[#7A777A] text-white' : 'btn'
              }
            >
              Contact
            </NavLink>
          </ul>
        </div>
        <div className="navbar-end flex items-center space-x-4">
          <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for a product..."
            className="border border-gray-300 rounded p-2 w-44"
          />
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="border border-gray-300 rounded p-2"
          >
            <option value="">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          <h2>{Name}</h2>
          <div className="relative">
            <div
              className="avatar cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
                <img
                  src={avatarUrl}
                  alt="User Avatar"
                  onError={(e) => {
                    e.target.src =
                      'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp';
                  }}
                />
              </div>
            </div>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                <ul className="py-1">
                  <li
                    className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
