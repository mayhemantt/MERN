import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import ProductForm from "../../../components/forms/ProductForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  shipping: "",
  quantity: "",
  categories: [],
  subs: [],
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  color: "",
  brand: "",
};

const ProductCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  useEffect(() => {
    loadCategories();
  }, []);
  const loadCategories = () =>
    getCategories().then((c) => setValues({ ...values, categories: c.data }));

  const handleSubmit = (e) => {
    // console.log(e);
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        setValues(initialState);
        window.alert(`${res.data.title} is Created`);
        // window.location.reload();
      })
      .catch((err) => {
        toast.error(err.response.data.err);
        // if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setValues({ ...values, category: e.target.value, subs: [] });
    console.log(e.target.value);
    getCategorySubs(e.target.value).then((res) => {
      setSubOptions(res.data);
      setShowSub(true);
      // console.log(res, "res");
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>Product Create</h4>
          <hr />
          <ProductForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            values={values}
            handleCategoryChange={handleCategoryChange}
            subOptions={subOptions}
            showSub={showSub}
            setValues={setValues}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
