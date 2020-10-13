import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createOrUpdateUser } from "../../functions/auth";

function RegisterComplete({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, [user, history]);
  //
  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation

    if (!email || !password) {
      toast.error("Email and Password is Required");
      return;
    }
    if (password.length < 6) {
      toast.error("Password  Must be 6 chars");
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      if (result.user.emailVerified) {
        // rm useremail from localstorage
        window.localStorage.removeItem("emailForRegistration");
        // get user id token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();

        // redux store config
        console.log(user, "-user", idTokenResult, "-idtoken");
        // redirect
        await createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                role: res.data.role,
                _id: res.data._id,
                email: res.email,
                token: idTokenResult.token,
              },
            });
            history.push("/");
          })
          .catch((err) => console.log(err));
      }
      //   console.log(result);
    } catch (error) {
      toast.error(error.code);
    }
  };

  const completeRegistrationForm = () => (
    <form className="mt-5" onSubmit={handleSubmit}>
      <input
        placeholder="E Mail"
        type="email"
        className="form-control"
        value={email}
        disabled
        required
      />
      <input
        placeholder="Password"
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
      />
      <button type="submit" className="btn btn-raised mt-3">
        Submit
      </button>
    </form>
  );
  return (
    <div>
      <div className="container p-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h4>Register</h4>
            {completeRegistrationForm()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterComplete;
