import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const API = "https://6410c403da042ca131fb737e.mockapi.io/haisan";

const Edit = () => {
  const [product, setProduct] = useState({
    id: '',
    name: '',
    image: '',
    price: '',
    type: '',
    description: '',
  });

  const { id } = useParams();

  useEffect(() => {
    axios.get(`${API}/${id}`)
      .then(response => {
        const data = response.data;
        setProduct(data);
      })
      .catch(error => {
        console.log('Error fetching product:', error);
      });
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(`${API}/${id}`, product);
      setProduct({
        id: '',
        name: '',
        image: '',
        price: '',
        type:'',
        description: '',
      });

      alert('Sản phẩm được cập nhật thành công!');

      setTimeout(() => {
        // Redirect to Admin page after editing
        // You may need to modify the path based on your routes
        window.location.href = '/Admin';
      }, 100);
    } catch (error) {
      console.log('Error editing product:', error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>ID</label>
                  <input type="text" className="form-control" value={product.id} onChange={handleInputChange} name="id" />
                </div>
                <div className="form-group">
                  <label>Tên Sản phẩm</label>
                  <input type="text" className="form-control" value={product.name} onChange={handleInputChange} name="name" />
                </div>
                <div className="form-group">
                  <label>Ảnh sản phẩm</label>
                  <input type="text" className="form-control" value={product.image} onChange={handleInputChange} name="image" />
                </div>
                <div className="form-group">
                  <label>Gía</label>
                  <input type="text" className="form-control" value={product.price} onChange={handleInputChange} name="price" />
                </div>
                <div className="form-group">
                  <label>Loai</label>
                  <input type="text" className="form-control" value={product.type} onChange={handleInputChange} name="type" />
                </div>
                <div className="form-group">
                  <label>Mô tả</label>
                  <input type="text" className="form-control" value={product.description} onChange={handleInputChange} name="description" />
                </div><br></br>
                <button type="submit" className="btn btn-primary">Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
