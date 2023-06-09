import React from 'react';
import '../style/footer.css';

const Footer = () => {
	return (
		<footer className="footer">
			<div className="container-footer">
				<div className="logo">
					<img src="https://o.remove.bg/downloads/ddb35274-0bd4-488c-8c2d-58a1be6abdf9/image-removebg-preview.png" alt="Logo" />
				</div>
				<div className="footer-content">
					<div className="contact-info">
						<p>Hải sản biển Đông</p>
						<p>Điện thoại: 01234567</p>
						<p>Email: hothikieu@gmail.com</p>
					</div>
					<div className="rating">
						<input type="text" placeholder="Đánh giá của bạn" />
						<button>Gửi đánh giá</button>
					</div>
				</div>
				<div className="privacy-policy">
					<p>@Thu Hương - Kiều Hí</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;