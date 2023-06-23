import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style/signup.css";

const Signup = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({});
	const [isUsernameTaken, setIsUsernameTaken] = useState(false);
	const [isEmailTaken, setIsEmailTaken] = useState(false);

	const handleUsernameChange = (event) => {
		setUsername(event.target.value);
	};

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const validate = () => {
		const errors = {};

		if (username.trim() === "") {
			errors.username = "Vui lòng nhập tên đăng nhập";
		}

		if (email.trim() === "") {
			errors.email = "Vui lòng nhập email";
		} else if (!email.includes("@")) {
			errors.email = "Email không hợp lệ";
		}

		if (password === "") {
			errors.password = "Vui lòng nhập mật khẩu";
		} else if (password.length < 8) {
			errors.password = "Mật khẩu phải có ít nhất 8 kí tự";
		}

		return errors;
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		const updatedErrors = { ...errors };
		delete updatedErrors[name];
		setErrors(updatedErrors);
		setIsUsernameTaken(false);
		setIsEmailTaken(false);

		if (name === "username") {
			setUsername(value);
		} else if (name === "email") {
			setEmail(value);
		} else if (name === "password") {
			setPassword(value);
		}
	};

	const checkUsernameAvailability = (username) => {
		axios
			.get(`https://63a572122a73744b008e28d5.mockapi.io/api/account?username=${username}`)
			.then((response) => {
				if (response.data.length > 0) {
					setIsUsernameTaken(true);
				} else {
					setIsUsernameTaken(false);
				}
			})
			.catch((error) => {
				console.error("Lỗi kiểm tra tài khoản:", error);
			});
	};

	const checkEmailAvailability = (email) => {
		axios
			.get(`https://63a572122a73744b008e28d5.mockapi.io/api/account?email=${email}`)
			.then((response) => {
				if (response.data.length > 0) {
					setIsEmailTaken(true);
				} else {
					setIsEmailTaken(false);
				}
			})
			.catch((error) => {
				console.error("Lỗi kiểm tra email:", error);
			});
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const validationErrors = validate();

		if (Object.keys(validationErrors).length === 0 && !isUsernameTaken && !isEmailTaken) {
			const signupData = {
				username: username,
				email: email,
				password: password,
			};

			axios
				.post("https://63a572122a73744b008e28d5.mockapi.io/api/account", signupData)
				.then((response) => {
					console.log("Đăng ký thành công:", response.data);
					navigate("/login"); // Chuyển hướng đến trang Login sau khi đăng ký thành công
				})
				.catch((error) => {
					console.error("Đăng ký thất bại:", error);
				});
		} else {
			setErrors(validationErrors);
		}
	};

	return (
		<div className="signup-container">
			<h2>Signup</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Username:</label>
					<input
						type="text"
						name="username"
						value={username}
						onChange={handleChange}
						onBlur={() => checkUsernameAvailability(username)}
					/>
					{errors.username && <span className="error">{errors.username}</span>}
					{isUsernameTaken && <span className="error">Tên đăng nhập đã tồn tại</span>}
				</div>
				<div>
					<label>Email:</label>
					<input
						type="email"
						name="email"
						value={email}
						onChange={handleChange}
						onBlur={() => checkEmailAvailability(email)}
					/>
					{errors.email && <span className="error">{errors.email}</span>}
					{isEmailTaken && <span className="error">Email đã tồn tại</span>}
				</div>
				<div>
					<label>Password:</label>
					<input type="password" name="password" value={password} onChange={handleChange} />
					{errors.password && <span className="error">{errors.password}</span>}
				</div>
				<button type="submit">Signup</button>
			</form>
		</div>
	);
};

export default Signup;
