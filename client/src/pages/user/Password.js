import React, { useState } from "react";
import UserNav from "../../components/nav/UserNav";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

function Password() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        setPassword("");
        toast.success("Password Updated");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err);
      });
  };
  const passwordUpdateForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="orm-group">
          <label> Your Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            placeholder="Enter New Password"
            disabled={loading}
            value={password}
          />
          <button
            className="btn btn-primary"
            disabled={!password || password.length < 6 || loading}>
            Submit
          </button>
        </div>
      </form>
    );
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <UserNav />
        </div>
        <div className="col">
          {loading ? <h4>Loading...</h4> : <h4>Password Update</h4>}
          {passwordUpdateForm()}
        </div>
      </div>
    </div>
  );
}

export default Password;
