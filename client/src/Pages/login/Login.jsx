import axios from "axios";
import { useContext } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/context";
import "./login.scss";

export default function Login() {

  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch , isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post('/auth/login', {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCESS", payload: res.data});

    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  }


  return (
    <div className="login">
    <div className="wrapper">
      <span className="loginTitle">Login</span>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username..."
            ref={userRef} />
        <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password..."
            ref={passwordRef} />
        <button type="submit" disabled={isFetching} >Login</button>
      </form>
        <button><Link to='/register'>Register</Link></button>
        </div>
    </div>
  );
}
