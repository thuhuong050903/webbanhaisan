import axios from "axios";
import '../style/Cart.css'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Cart = () => {
	const { id } = useParams();
	const [product, setProduct] = useState([]);
	const [cartItems, setCartItems] = useState([]);
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
	useEffect(() => {
		getproduct();
		loadCartItems();
	}, []);

	const removeItemFromCart = async (item) => {
		try {
			await axios.delete(`https://6410c403da042ca131fb737e.mockapi.io/gioHang/${item.id}`);
			const updatedItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
			setCartItems(updatedItems);
			console.log("Xóa khỏi giỏ hàng thành công");
		} catch (error) {
			console.log("Lỗi khi xóa khỏi giỏ hàng:", error);
		}
	};

	const getproduct = async () => {
		try {
			const response = await axios.get(`https://6410c403da042ca131fb737e.mockapi.io/haisan/${id}`);
			setProduct(response.data);
		} catch (error) {
			console.log("Lỗi khi lấy sản phẩm:", error);
		}
	};
	const increaseQuantity = async (item) => {
		try {
			const currentQuantity = item.quantity || 1; // Sử dụng giá trị mặc định (1) nếu trường quantity là null
			const updatedItem = { ...item, quantity: currentQuantity + 1 }; // Tăng số lượng sản phẩm
			await axios.put(`https://6410c403da042ca131fb737e.mockapi.io/gioHang/${item.id}`, updatedItem);

			const totalPrice = updatedItem.price * (currentQuantity + 1); // Tính tổng giá mới
			const updatedItemWithTotalPrice = { ...updatedItem, totalPrice }; // Cập nhật giá trị totalPrice

			await axios.put(`https://6410c403da042ca131fb737e.mockapi.io/gioHang/${item.id}`, updatedItemWithTotalPrice);

			const updatedItems = cartItems.map((cartItem) =>
				cartItem.id === item.id ? updatedItemWithTotalPrice : cartItem
			);
			setCartItems(updatedItems);
			console.log('Tăng số lượng sản phẩm thành công');
		} catch (error) {
			console.log('Lỗi khi tăng số lượng sản phẩm:', error);
		}
	};

	const decreaseQuantity = async (item) => {
		try {
			const currentQuantity = item.quantity || 1; // Sử dụng giá trị mặc định (0) nếu trường quantity là null
			if (currentQuantity === 1) {
				// Nếu số lượng là 1, xóa sản phẩm khỏi giỏ hàng
				await removeItemFromCart(item);
			} else {
				const updatedItem = { ...item, quantity: currentQuantity - 1 }; // Giảm số lượng sản phẩm
				await axios.put(`https://6410c403da042ca131fb737e.mockapi.io/gioHang/${item.id}`, updatedItem);
				const totalPrice = updatedItem.price * (currentQuantity - 1); // Tính tổng giá mới
				const updatedItemWithTotalPrice = { ...updatedItem, totalPrice }; // Cập nhật giá trị totalPrice
				await axios.put(`https://6410c403da042ca131fb737e.mockapi.io/gioHang/${item.id}`, updatedItemWithTotalPrice);


				const updatedItems = cartItems.map((cartItem) =>
					cartItem.id === item.id ? updatedItemWithTotalPrice : cartItem
				); setCartItems(updatedItems);
				console.log('Giảm số lượng sản phẩm thành công');
			}
		} catch (error) {
			console.log('Lỗi khi giảm số lượng sản phẩm:', error);
		}
	};


	const getTotalPrice = () => {
		const totalPrice = cartItems.reduce(
			(accumulator, item) => accumulator + item.totalPrice,
			0
		);
		return totalPrice;
	};

	const placeOrder = async () => {
		try {
			const total = getTotalPrice(); // Tính tổng số tiền
			const date = new Date().toISOString(); // Lấy ngày đặt hàng

			const order = {
				userId: user.id,
				items: cartItems,
				total: total,
				date: date,
			};

			for (const item of cartItems) {
				await axios.delete(`https://6410c403da042ca131fb737e.mockapi.io/gioHang/${item.id}`);
			}

			await axios.post('https://6494fc68b08e17c917918bae.mockapi.io/lichsu', order);

			console.log('Đặt hàng thành công');
			alert('Đặt hàng thành công!');
			loadCartItems();

		} catch (error) {
			console.log('Lỗi khi đặt hàng:', error);
		}
	};


	const loadCartItems = async () => {
		try {
			const response = await axios.get("https://6410c403da042ca131fb737e.mockapi.io/gioHang");
			setCartItems(response.data);
		} catch (error) {
			console.log("Lỗi khi tải giỏ hàng:", error);
		}
	};

	return (
		<div className="container">
			<h2>Giỏ hàng</h2>
			{cartItems.length > 0 ? (
				<table className="table table-bordered">
					<thead>
						<tr>
							<th>Tên sản phẩm</th>
							<th>Ảnh sản phẩm</th>
							<th>Giá</th>
							<th>Số lượng</th>
							<th>Xóa</th>
						</tr>
					</thead>
					<tbody>
						{cartItems.map((item) => (
							<tr key={item.id}>
								<td>{item.name}</td>
								<td>
									<img style={{ width: "100px", height: "100px" }} src={item.image} alt={item.name} />
								</td>
								<td>{item.totalPrice}</td>
								<td>
									<button className="tang-button" onClick={() => increaseQuantity(item)}>+</button>
									<span className="space-between-buttons">{item.quantity}</span>
									<button className="giam-button" onClick={() => decreaseQuantity(item)}>-</button>
								</td>
								<td>
									<button className="btn btn-warning" onClick={() => removeItemFromCart(item)}>Xóa</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p>Giỏ hàng trống</p>
			)}

			{cartItems.length > 0 && (
				<button className="btn btn-success" onClick={placeOrder}>Đặt hàng</button>
			)}
		</div>
	);
};

export default Cart;