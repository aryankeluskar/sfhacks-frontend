import React from 'react';

const RegisterForm: React.FC = () => {
  const validateForm = () => {
    // Add your form validation logic here
  };

  return (
    <body>
      <h2>Register or Sign up</h2>
      <main>
        <form action="/users/register" method="post" encType="application/x-www-form-urlencoded">
          <p>Please enter the following details.</p>
          <input type="text" placeholder="Enter Username" name="username" required />
          <br />
          <br />
          <input type="text" placeholder="Enter E-mail" name="email" required size={23} />
          <br />
          <br />
          <input type="password" placeholder="Enter Password" name="password" required />
          <br />
          <br />
          <input type="password" placeholder="Confirm Password" name="confirmPassword" required />
          <br /><br />
          <p>Accept if you are 13+ years of age.<input type="checkbox" name="aocCheck" required /></p>
          <pre>Accept <a href="">TOS</a> and<a href=""> Privacy Rules.</a><input type="checkbox" name="tosCheck" /><button type="submit" onClick={validateForm}>Register</button></pre>
        </form>
      </main>
    </body>
  );
};

export default RegisterForm;
