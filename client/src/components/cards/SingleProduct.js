import React, { useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductListItems from "./ProductListItems";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
const { Meta } = Card;
const { TabPane } = Tabs;

const SingleProduct = ({ product, onStarClick, star }) => {
  const { title, description, images, slug, _id } = product;

  const [tooltip, setTooltip] = useState("click to add");

  const { user, cart } = useSelector((state) => ({ ...state }));
  // redux
  const dispatch = useDispatch();

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
  return (
    <>
      <div className="col-md-7">
        {images && images.length && (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
          </Carousel>
        )}

        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call use on xxxx xxx xxx to learn more about this product.
          </TabPane>
        </Tabs>
      </div>

      <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>
        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center pt-1 pb-3">" No Rating Yet"</div>
        )}
        {/* <StarRating
          name={_id}
          numberOfStars={5}
          rating={2}
          changeRating={(newRating, name) =>
            console.log("newRating", newRating, "name", name)
          }
          isSelectable={true}
          starRatedColor="red"
        /> */}
        <Card
          actions={[
            <Tooltip title={tooltip}>
              <a onClick={handleAddToCart}>
                <ShoppingCartOutlined className="text-danger" /> <br /> Add to
                Add To Cart
              </a>
            </Tooltip>,
            <Link to="/">
              <HeartOutlined className="text-info" /> <br /> Add to Wishlist
            </Link>,
            <RatingModal>
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                // changeRating={(newRating, name) =>
                //   console.log("newRating", newRating, "name", name)
                // }
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor="red"
              />
            </RatingModal>,
          ]}>
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
