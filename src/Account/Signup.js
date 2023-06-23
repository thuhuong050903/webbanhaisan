import React, { useState } from "react";
import axios from "axios";
import '../style/signup.css'
const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Tạo object chứa thông tin đăng ký
    const signupData = {
      username: username,
      email: email,
      password: password,
    };

    // Gửi yêu cầu POST đến MockAPI
    axios
      .post("https://63a572122a73744b008e28d5.mockapi.io/api/account", signupData)
      .then((response) => {
        console.log("Đăng ký thành công:", response.data);
        // Thực hiện các xử lý sau khi đăng ký thành công
      })
      .catch((error) => {
        console.error("Đăng ký thất bại:", error);
        // Thực hiện các xử lý khi đăng ký thất bại
      });
  };

  return (
    <div className="signup-container">
      <h2>Singup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">Singup</button>
      </form>
    </div>
  );
};

export default Signup;
