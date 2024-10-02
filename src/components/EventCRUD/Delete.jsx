import React from "react";
import PropTypes from "prop-types";

const Delete = ({ onDelete }) => {
  return (
    <button className="danger" onClick={onDelete}>
      Delete
    </button>
  );
};

Delete.propTypes = {
  onDelete: PropTypes.func.isRequired,
};

export default Delete;
