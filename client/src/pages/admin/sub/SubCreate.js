import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { createSub, getSub, removeSub } from "../../../functions/subCategory";
import CategoryForm from "../../.././components/forms/CategoryForm";
import LocalSearch from "../../.././components/forms/LocalSearch";

function SubCreate() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  const [subs, setSubs] = useState([]);

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    getSub().then((c) => {
      setCategories(c.data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    // console.log(name);
    createSub({ name }, user.token)
      .then((res) => {
        // console.log(res);
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} created`);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = (slug) => {
    let answer = window.confirm(`Delete ${slug}`);
    if (answer) {
      setLoading(true);
      removeSub(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.warn(`${slug} Deleted Successfully`);
        })
        .catch((err) => {
          setLoading(false);
          if (err.response.status === 400) toast.error(err.response.data);
        });
    }
  };

  const searched = (key) => (c) => c.name.toLowerCase().includes(key);

  return (
    <div className="container-fluid">
      <LocalSearch keyword={keyword} setKeyword={setKeyword} />
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
          <div className="p-4">
            {categories.filter(searched(keyword)).map((c) => {
              return (
                <div className="alert alert-primary" key={`${c._id}`}>
                  {c.name}
                  <span
                    onClick={() => handleRemove(c.slug)}
                    className="btn btn-sm float-right">
                    <DeleteOutlined className="text-danger" />
                  </span>
                  <Link to={`/admin/category/${c.slug}`}>
                    <span className="btn btn-sm float-right">
                      <EditOutlined className="text-warning" />
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubCreate;

SubCreate;
