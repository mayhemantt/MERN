/** @format */

import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { createOrUpdateUser } from "../../functions/auth";

function Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user, history]);

  const roleBasedRedirect = (res) => {
    if (res.data.role === "admin") {
      history.push("/admin/dashboard");
    } else {
      history.push("/user/history");
    }
  };

  const googleLogin = async () => {
    try {
      const result = await auth.signInWithPopup(googleAuthProvider);
      console.log(result);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      await createOrUpdateUser(idTokenResult.token).then((res) => {
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
        // history.push("/");
        roleBasedRedirect(res);
      });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      // console.log(result);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      // console.log(idTokenResult, "------------");

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
          roleBasedRedirect(res);
          // history.push("/");
        })
        .catch((err) => console.log(err));
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.message);
    }
  };
  const loginForm = () => (
    <form className="mt-5" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          placeholder="E Mail"
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
          required
        />
      </div>

      <div className="form-group">
        <input
          placeholder="Password"
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button
        onClick={handleSubmit}
        type="primary"
        blocks="true"
        shape="round"
        icon={<MailOutlined />}
        size="large"
        disabled={!email || password.length < 6}>
        Login With Email Password
      </Button>
    </form>
  );
  return (
    <div>
      <div className="container p-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            {loading ? (
              <h4 className="text-danger">Loading...</h4>
            ) : (
              <h4>Login</h4>
            )}
            {loginForm()}
            <Button
              onClick={googleLogin}
              type="danger"
              className="mb-3"
              blocks="true"
              shape="round"
              icon={<GoogleOutlined />}
              size="large">
              Login With Google
            </Button>
            <Link
              to="/forgot/password"
              className="float-right"
              style={{ textDecoration: "underline" }}>
              Forgot Password &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
