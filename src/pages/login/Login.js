import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import Preloader from "../../components/Preloader/";
import belinasiApi from "../../apis/belinasiApi";
import "./login.css";

const Login = () => {
  const history = useHistory();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [pageStatus, setPageStatus] = useState("loaded");

  const login = async (e) => {
    try {
      e.preventDefault();

      setPageStatus("loading");

      const { data } = await belinasiApi.post("/users/login", {
        email,
        password,
      });

      localStorage.setItem("adminId", data.data.user.id);
      setPageStatus("loaded");

      toast.success("Welcome back admin!");

      history.push("/admin/");
    } catch (err) {
      if (err.response.data) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <React.Fragment>
      <Preloader status={pageStatus} />

      <div className="login">
        <h1>Admin Login</h1>

        <form className="login__form" onSubmit={login}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              placeholder="username@domain.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              placeholder="pasword1234"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button>Login</button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Login;
