import React from "react";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Meta } = Card;
const AdminProductCard = ({ product, handleRemove }) => {
  // destructure
  const { title, description, images } = product;

  return (
    <Card
      cover={
        <img
          src={images && images.length ? images[0].url : ""}
          style={{ height: "150px", objectFit: "cover" }}
          className="p-1"
        />
      }
      actions={[
        <Link to={`/admin/product/${product.slug}`}>
          <EditOutlined className="text-warning" />
        </Link>,
        <DeleteOutlined
          className="text-danger"
          onClick={() => handleRemove(product.slug)}
        />,
      ]}>
      <Meta
        title={title}
        description={`${description && description.substring(0, 39)}...`}
      />
    </Card>
  );
};

export default AdminProductCard;
