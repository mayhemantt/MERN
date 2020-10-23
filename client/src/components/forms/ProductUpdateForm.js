import React from "react";
import { Select } from "antd";
const { Option } = Select;
function ProductUpdateForm({
  handleCategoryChange,
  handleChange,
  handleSubmit,
  values,
  subOptions,
  showSub,
  setValues,
}) {
  const { subs } = values;
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={values.title}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Category</label>
        <select
          name="category"
          className="form-control"
          onChange={handleCategoryChange}>
          <option>Please select</option>
          {values.categories.length > 0 &&
            values.categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          name="description"
          className="form-control"
          value={values.description}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          name="price"
          className="form-control"
          value={values.price}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Shipping</label>
        <select
          value={values.shipping === "Yes" ? "Yes" : "No"}
          name="shipping"
          className="form-control"
          onChange={handleChange}>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>
      <div className="form-group">
        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          className="form-control"
          value={values.quantity}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Color</label>
        <select
          value={values.color}
          name="color"
          className="form-control"
          onChange={handleChange}>
          {values.colors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Brand</label>
        <select
          value={values.brand}
          name="brand"
          className="form-control"
          onChange={handleChange}>
          {values.brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      {showSub && (
        <div>
          <label>Sub Categories</label>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Please Select"
            value={subs}
            onChange={(value) => setValues({ ...values, subs: value })}>
            {subOptions.length &&
              subOptions.map((s, i) => (
                <Option value={s._id} key={s._id}>
                  {s.name}{" "}
                </Option>
              ))}
          </Select>
        </div>
      )}
      <button className="btn btn-outline-info">Save</button>
    </form>
  );
}

export default ProductUpdateForm;
