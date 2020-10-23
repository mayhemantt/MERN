import React, { useEffect, useState } from "react";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import AdminNav from "../../../components/nav/AdminNav";
import { getProductsByCount, removeProduct } from "../../../functions/product";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = async () => {
    setLoading(true);
    const prodResult = await getProductsByCount(100);
    if (prodResult.err) {
      setLoading(false);
      console.log(prodResult.err.response.data.err);
    } else {
      setLoading(false);
      setProducts(prodResult.data);
    }
  };

  const handleRemove = (slug) => {
    let answer = window.confirm("delete");
    if (answer) {
      console.log(slug, "slug");
      removeProduct(slug, user.token)
        .then((res) => {
          loadAllProducts();
          toast.error(`${res.data}`);
        })
        .catch((err) => {
          toast.error(err.response.data);
        });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 pb-3">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>All Products</h4>
          )}
          <div className="row">
            {products.map((p, i) => (
              <AdminProductCard
                product={p}
                key={i}
                handleRemove={handleRemove}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllProducts;
