import React from "react";
import { useState } from "react";
import login from "../../services/user";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import actionCreator from "../../redux/action";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

    const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitLogin = async () => {
    const result = await login(username, password);
    console.log(result);
    dispatch(actionCreator.loginAction(result.token));

    if (result.status === 404) {
        navigate("/home");
      }
  };

  return (
    <div className="login">
      <label>User name</label>
      <input onChange={(e) => setUsername(e.target.value)} type="text" />
      <label>Password</label>
      <input onChange={(e) => setPassword(e.target.value)} type="password" />
      <button onClick={submitLogin}>Login</button>
    </div>
  );
}

export default Login;
