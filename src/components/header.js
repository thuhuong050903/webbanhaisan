import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import '../style/header.css';

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      // Nếu đã đăng nhập, lấy thông tin người dùng từ local storage và cập nhật trạng thái
      const user = JSON.parse(loggedInUser);
      setUser(user);
    }
  }, []);

  const handleLogout = () => {
    // Xóa thông tin người dùng khỏi localStorage
    localStorage.removeItem('user');
    // Cập nhật trạng thái user về null
    setUser(null);
    // Chuyển hướng về trang chủ sau khi đăng xuất
	window.location.href = '/';
  };
  const [cartItems, setCartItems] = useState([]);

  return (
    <header className="header fixed-header">
      <nav className="navbar">
        <div className="logo">
          <img
            src="https://o.remove.bg/downloads/30b965e8-d5ff-4901-9559-6123fc9415d6/image_3328_-removebg-preview.png"
            alt="Logo"
            style={{ height: '100px', width: '200px' }}
          />
          &nbsp;&nbsp;&nbsp;
        </div>
        <div className="menu">
          <ul>
            <li>
              <Link to="/">Trang chủ</Link>
            </li>
            <li>
              <Link to="/admin">Trang Admin</Link>
            </li>
            {user ? (
              <>
			  <li>
				<Link to='/lichsu'>Lịch sử</Link>
			  </li>
                <li>{user.username}</li>
                <li>
                  <button onClick={handleLogout}>Đăng xuất</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Đăng Nhập</Link>
                </li>
                <li>
                  <Link to="/signup">Đăng Kí</Link>
                </li>
              </>
            )}
            <li>
              <Link to="/Shopping">
                <img src="https://o.remove.bg/downloads/0f25a9ac-51df-4ae8-9ad1-18fea5bfd674/image-removebg-preview.png" height="50px" />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
