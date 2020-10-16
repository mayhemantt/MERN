import React from "react";

function LocalSearch(props) {
  const handleSearchChange = (e) => {
    e.preventDefault();
    props.setKeyword(e.target.value.toLowerCase());
  };

  return (
    <div className="row  m-2">
      <div className="col offset-md-2">
        <input
          type="search"
          placeholder="Search"
          value={props.keyword}
          onChange={handleSearchChange}
          className="form-control"
        />
      </div>
      <div className="col-md-3">
        <button
          className="btn btn-primary btn-m active"
          onClick={handleSearchChange}>
          Search
        </button>
      </div>
    </div>
  );
}

export default LocalSearch;
