import '../style/header.css';
import Shopping from './Shopping';
import { Routes, Route, Link } from "react-router-dom";
import React from 'react';

const Header = () => {
	return (
		<header className="header fixed-header">
			<nav className="navbar">
				<div className="logo">
				<img src="https://o.remove.bg/downloads/30b965e8-d5ff-4901-9559-6123fc9415d6/image_3328_-removebg-preview.png" alt="Logo" style={{ height: "100px", width: "200px" }} />&nbsp;&nbsp;&nbsp;
				</div>
				<div className="menu">
					<ul>
						<li>
							<Link to="/">Trang chủ</Link>
						</li>
						<li>
							<Link to="/admin">Trang Admin</Link>
						</li>
						<li>
							<Link to="/login">Đăng Nhập</Link>
						</li>
						<li>
							<Link to="/Shopping"><img src="https://o.remove.bg/downloads/0f25a9ac-51df-4ae8-9ad1-18fea5bfd674/image-removebg-preview.png" height="50px"></img></Link>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
};

export default Header;