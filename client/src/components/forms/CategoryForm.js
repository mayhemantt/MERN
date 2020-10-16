import React from "react";

function CategoryForm(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          placeholder="Type The Name Of New Category You Want To Create"
          type="text"
          className="form-control"
          value={props.name}
          onChange={(e) => props.setName(e.target.value)}
          autoFocus
          required
        />
        <button className="btn btn-outlined-primary mt-4">Submit</button>
      </div>
    </form>
  );
}

export default CategoryForm;
