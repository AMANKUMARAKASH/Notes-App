import React, { useState } from "react";
import './LoginPage.css';
import axios from "axios";

export default function LoginPage() {
 const [email,setEmail]=useState("");
 const [password, setPassword] = useState("");

 const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };  

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("/login", {
        email: email,
        password: password
      }, { withCredentials: true });

      // Handle successful login response, if needed
      console.log("Login successful", response.data);
    } catch (error) {
      // Handle login error
      console.error("Login failed", error.response.data);
    }
  };
  

  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Login</div>
      </div>
      <br />
      <form onSubmit={handleLogin}>
        <div className={"inputContainer"}>
          <input
             type="email"
            placeholder="Enter your email here"
            className={"inputBox"}
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <br />
        <div className={"inputContainer"}>
          <input
            type="password"
            placeholder="Enter your password here"
            className={"inputBox"}
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <br />
        <div className={"inputContainer"}>
          <button
            className={"inputButton"}
            type="submit"
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  );
}
