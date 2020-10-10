import React, { useState } from "react";
import { auth } from "../../firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const handleSubmit = () =>{
    e.preventDefault()
    const config={
        url=""
    }
  }
  const [email, setEmail] = useState("");
  const registerForm = () => (
    <form className='mt-5' onSubmit={handleSubmit}>
      <input
        placeholder='E Mail'
        type='email'
        className='form-control'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
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
