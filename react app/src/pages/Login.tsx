import { useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log({"Username": username, "Password": password});
    setUsername("");
    setPassword("");
  };

  return (
    <div className={styles.container}>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            onChange={handleUsername}
            value={username}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            onChange={handlePassword}
            value={password}
          />
        </div>
        <div>
          <input type="submit" value="Login" />
        </div>
        <div>
          <Link to="signup">Don't have an account? Create new account.</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;