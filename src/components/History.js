import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  const fetchOrderHistory = async () => {
    try {
      const response = await axios.get('https://6494fc68b08e17c917918bae.mockapi.io/lichsu'); 
      setOrders(response.data);
    } catch (error) {
      console.log('Lỗi khi lấy lịch sử đơn hàng:', error);
    }
  };

  return (
    <div className="container">
      <h2>Lịch sử đơn hàng</h2>
      {orders.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID Đơn hàng</th>
              <th>Sản phẩm</th>
              <th>Tổng tiền</th>
              <th>Ngày đặt hàng</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.userId}</td>
                <td>
                  <ul>
                    {order.items.map((item) => (
                      <li key={item.id}>
                        {item.name} - {item.price}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{order.total}</td>
                <td>{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Không có đơn hàng nào trong lịch sử</p>
      )}
    </div>
  );
};

export default OrderHistory;
