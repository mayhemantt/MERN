import React, { useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

function Register() {
  const [email, setEmail] = useState("");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const config = {
  //     url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
  //     handleCodeInApp: true,
  //   };

  //   await auth.sendSignInLinkToEmail(email, config);
  //   toast.success(`Email is sent to ${email}`);
  //   // save user email to local storage
  //   window.localStorage.setItem("emailForRegistration", email);
  //   // clear

  //   setEmail("");
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    auth
      .sendSignInLinkToEmail(email, config)
      .then((data) => {
        toast.success(`Email Sent`);
        window.localStorage.setItem("emailForRegistration", email);
        setEmail("");
      })
      .catch((err) => {
        toast.error(`${err.message}`);
      });
  };

  const registerForm = () => (
    <form className='mt-5' onSubmit={handleSubmit}>
      <input
        placeholder='E Mail'
        type='email'
        className='form-control'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
        required
      />
      <button type='submit' className='btn btn-raised mt-3'>
        Register
      </button>
    </form>
  );
  return (
    <div>
      <div className='container p-5'>
        <div className='row'>
          <div className='col-md-6 offset-md-3'>
            <h4>Register</h4>
            {registerForm()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
