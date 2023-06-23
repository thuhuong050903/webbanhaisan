import React, { useState } from "react";
import axios from "axios";
import "../style/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Tạo object chứa thông tin đăng nhập
    const loginData = {
      email: email,
      password: password,
    };

    // Gửi yêu cầu GET đến API để lấy danh sách tài khoản
    axios
      .get("https://63a572122a73744b008e28d5.mockapi.io/api/account")
      .then((response) => {
        // Kiểm tra xem email và mật khẩu có tồn tại trong danh sách tài khoản hay không
        const account = response.data.find(
          (item) => item.email === email && item.password === password
        );
        const username = response.data.username;

        if (account) {
          console.log("Đăng nhập thành công");
          localStorage.setItem("user", JSON.stringify(account));
          localStorage.setItem("username", JSON.stringify(username));
          window.location.href='/';
          // Thực hiện các xử lý sau khi đăng nhập thành công
        } else {
          setLoginError("Email hoặc mật khẩu không chính xác");
        }
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu từ API:", error);
        // Xử lý lỗi khi không thể lấy dữ liệu từ API
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {loginError && <p className="error-message">{loginError}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
