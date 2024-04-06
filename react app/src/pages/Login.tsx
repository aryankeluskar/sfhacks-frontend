import React from 'react';

const LoginForm: React.FC = () => {
  const validateForm = () => {
    // Add your form validation logic here
  };

  return (
    <body>
      <h2>Login Form</h2>
      <main>
        <p>Enter your ID and Password.</p>
        <section>
          <form action="/users/login" method="post">
            <input type="text" placeholder="Enter Username" name="username" required /><br /><br />
            <input type="password" placeholder="Enter Password" name="password" required /><br /><br />
            <button type="submit" onClick={validateForm}>Login</button>
            <button type="button"><a href="/register">Register</a></button>
          </form>
        </section>
      </main>
    </body>
  );
};

export default LoginForm;
