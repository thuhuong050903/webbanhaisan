import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cart from './Cart';
import '../style/Show.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Show = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://6410c403da042ca131fb737e.mockapi.io/haisan');
      setData(response.data);
      setSearchResults(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchButton = () => {
    const results = data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  const addToCart = async (item) => {
    try {
      const cartItem = {
        ...item,
        quantity: 1,
        totalPrice: item.price
      };

      const existingItem = cartItems.find((item) => item.id === cartItem.id);

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice += item.price;
      } else {
        setCartItems([...cartItems, cartItem]);
      }

      await axios.post('https://6410c403da042ca131fb737e.mockapi.io/gioHang', cartItem);

      console.log('Thêm vào giỏ hàng thành công');
      alert('Thêm vào giỏ hàng thành công!');
    } catch (error) {
      console.log('Lỗi khi thêm vào giỏ hàng:', error);
    }
  };


  const handleCartIconClick = () => {
    setShowCart(true);
    // window.location.href = '/giohang'; // Loại bỏ dòng này
  };

  if (showCart) {
    return <Cart cartItems={cartItems} />;
  }

  return (
    <div className="container">
      <header>
        <h1>Website của bạn</h1>
        <button onClick={handleCartIconClick}>Giỏ hàng</button>
      </header>
      <br />
      <br />
      <h3 className="colection">SẢN PHẨM NỔI BẬT</h3>
      <br />
      <input
        type="text"
        placeholder="Vui lòng nhập từ khóa cần tìm"
        value={searchTerm}
        onChange={handleSearch}
        className="input"
      />
      <button className="button-search" onClick={handleSearchButton}>
        Tìm kiếm
      </button>
      <br />
      <br />
      <div className="row">
        {searchResults.map((e) => (
          <div className="col-md-3" key={e.id}>
            <div className="card">
              <img src={e.image} alt={e.name} className="card-img-top" />
              <div className="card-body">
                <h4 className="card-title">{e.name}</h4>
                <p className="card-type">{e.type}</p>
                <p className="card-text">{e.description}</p>
                <p className="card_price"> {e.price}</p>
                <div className="function">
                  <button className="button1" onClick={() => addToCart(e)}>
                    Thêm giỏ hàng
                  </button>
                  <Link className="button1" to={`/product/${e.id}`}>
                    Chi tiết
                  </Link>
                  <button className="button">Mua ngay</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Show;
