import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "../css/SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate(); // Call useNavigate at the top level

  const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (
      username === "" ||
      password === "" ||
      email === "" ||
      confirmPassword === ""
    ) {
      alert("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const user = {
      username,
      password,
      email,
    };

    const url = "http://localhost:3001/users";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const addedProduct = await res.json();

      console.log(addedProduct);
    } catch (error) {
      console.error("Error posting data:", error);
    }

    // Reset fields after submission for demonstration
    setUsername("");
    setPassword("");
    setEmail("");
    setConfirmPassword("");
    
    // Use navigate inside handleSubmit
    navigate(`/${email}/topics`); // Redirect to the user's email page
  };

  return (
    <div className={styles.container}>
      <h1>Create a new user</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            value={username}
            onChange={handleUsername}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePassword}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm your password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={handleConfirmPassword}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmail}
          />
        </div>
        <div>
          <input type="submit" value="Sign Up" />
        </div>
        <div>
          <Link to="/">Already have an account? Login here.</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;