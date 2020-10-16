import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { updateCategory, getCategory } from "../../../functions/category";
import CategoryForm from "../../.././components/forms/CategoryForm";

function UpdateCategory(props) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = () => {
    getCategory(props.match.params.slug).then((c) => {
      setName(c.data.name);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    // console.log(name);
    updateCategory(props.match.params.slug, { name }, user.token)
      .then((res) => {
        // console.log(res);
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} updated`);
        props.history.push("/admin/category");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  return (
    <div className="container-fluid">
      {loading ? (
        <h4 className="text-primary text-center">Loading...</h4>
      ) : (
        <h4 className="text-primary text-center"> Forgot Password</h4>
      )}
      <div className="row">
        <div className="col-md-3">
          <AdminNav />
        </div>
        <div className="col mt-5">
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
        </div>
      </div>
    </div>
  );
}

export default UpdateCategory;
