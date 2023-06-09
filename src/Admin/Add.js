import React, { useState } from 'react';
import axios from 'axios';

const API = "https://6410c403da042ca131fb737e.mockapi.io/haisan";

const Add = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    image: "",
    price: "",
    type: "",
    description: ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(API, newProduct);
      setNewProduct({
        name: "",
        image: "",
        price: "",
        type: "",
        description: ""
      });

      alert('Thêm mới thành công!');
      setTimeout(() => {
        window.location = '/Admin'; // Replace with your desired URL
      }, 100);
    } catch (error) {
      alert('Thêm mới không thành công:', error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-body">
              <div className="form-group">
                <label>Tên Sản phẩm</label>
                <input type="text" className="form-control" value={newProduct.name} onChange={handleInputChange} name="name" />
              </div>
              <div className="form-group">
                <label>Ảnh sản phẩm</label>
                <input type="text" className="form-control" value={newProduct.image} onChange={handleInputChange} name="image" />
              </div>
              <div className="form-group">
                <label>Giá</label>
                <input type="text" className="form-control" value={newProduct.price} onChange={handleInputChange} name="price" />
              </div>
              <div className="form-group">
                <label>Loai</label>
                <input type="text" className="form-control" value={newProduct.type} onChange={handleInputChange} name="type" />
              </div>
              <div className="form-group">
                <label>Mô tả</label>
                <input type="text" className="form-control" value={newProduct.description} onChange={handleInputChange} name="description" />
              </div> <br></br>
              <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
