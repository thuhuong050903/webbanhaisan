import React from "react";
import axios from "axios";
import '../style/admin.css';
import { Link } from 'react-router-dom';

const API = "https://6410c403da042ca131fb737e.mockapi.io/haisan"

class PageAdmin extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          product: [],
          id: null,
          name: "",
          image: "",
          price: "",
          type: "",
          description:""
        };
    }
    setStatus = () => {
        this.setState({ showAddForm: !this.state.showAddForm });
    }
    componentDidMount() {
        axios
            .get(API)
            .then(response => {
                this.setState({ product: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    }
    render() {
        return (
            <div>

                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-body">
                                    <h4 class="Title_table">Quản lý sản phẩm</h4>
                                    <p className="card-text">
                                    <button className="btn btn-primary"> <a style={{color: 'white',textDecoration:'none'}}  href={`/Add`}>Thêm sản phẩm mới</a></button>
                                    </p>
                                    {this.state.showAddForm ? this.formAddBook() : null}

                                    <table className="table table-bordered">
                                        <thead>

                                            <tr>
                                                <th>ID</th>
                                                <th>Tên sản phẩm</th>
                                                <th>Ảnh sản phẩm</th>
                                                <th>Gía</th>
                                                <th>Loai</th>
                                                <th>Mô tả sản phẩm</th>
                                                <th>Sửa</th>
                                                <th>Xóa</th>

                                            </tr>
                                        </thead>

                                        <tbody>
                                            {this.state.product.map((products) =>(
                                                <tr >
                                                    <td><textbox type="text" name="id" onChange={this.handleChange} /> {products.id}</td>
                                                    <td>{products.name}</td>
                                                    <td><img className="img2" src={products.image} alt={products.name} /></td>
                                                    <td>{products.price}</td>
                                                    <td>{products.type}</td>
                                                    <td>{products.description}</td>
                                                    <td> 
                                                    <button className="btn btn-primary mr-2">
                                                        <Link to={`/Edit/${products.id}`} style={{ color: "white" }}className="btn btn-primary mr-2">
                                                             Edit
                                                        </Link>
                                                    </button>
                                                    </td>
                                                    <td>
                                                    <button type="submit"  className="btn btn-primary mr-2" >
                                                            <a style={{color: 'white',textDecoration:'none'}} className="btn btn-primary mr-2" href={`/Delete/${products.id}`}>Delete</a>
                                                    </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                    </table>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
        );
     }
 }
export default PageAdmin;
