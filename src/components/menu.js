import React, { useState } from 'react';
import '../style/menu.css';
import Admin from '../Admin/Admin';
import Cart from './Cart';
import App from '../App';

const Menu = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const handleMenuClick = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <App/>;
      case 'cart':
        return <Cart />;
      case 'admin':
        return <Admin />;
      default:
        return null;
    }
  };

  return (
    <div className='menu'>
      <ul>
        <li onClick={() => handleMenuClick('home')}>TRANG CHỦ</li>
        <li onClick={() => handleMenuClick('cart')}>GIỎ HÀNG</li>
        <li onClick={() => handleMenuClick('admin')}>ADMIN</li>
      </ul>
      {renderPage()}
    </div>
  );
};

export default Menu;
