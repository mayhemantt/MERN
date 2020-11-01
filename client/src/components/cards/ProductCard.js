import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
const { Meta } = Card;

const ProductCard = ({ product }) => {
  const { user, cart } = useSelector((state) => ({ ...state }));
  // redux
  const dispatch = useDispatch();
  const [tooltip, setTooltip] = useState("click to add");

  const handleAddToCart = () => {
    // show tooltip
    // create or update
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in localstorage

      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push to cart
      cart.push({
        ...product,
        count: 1,
      });
      //
      // remove duplicate
      let unique = _.uniqWith(cart, _.isEqual);

      // save to localstorage
      console.log("unique", unique);

      localStorage.setItem("cart", JSON.stringify(unique));

      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });

      // tooltip
      setTooltip("Added");
    }
  };
  // destructor
  const { images, title, description, slug, price } = product;
  return (
    <React.Fragment>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className="text-center pt-1 pb-3">No rating yet</div>
      )}
      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : ""}
            style={{ height: "150px", objectFit: "cover" }}
            className="p-1"
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-warning" /> <br /> View Product
          </Link>,
          <Tooltip title={tooltip}>
            <a onClick={handleAddToCart}>
              <ShoppingCartOutlined className="text-danger" /> <br /> Add to
              Cart
            </a>
          </Tooltip>,
        ]}>
        <Meta
          title={`${title} - $${price}`}
          description={`${description && description.substring(0, 40)}...`}
        />
      </Card>
    </React.Fragment>
  );
};

export default ProductCard;
