"use client";

import React from "react";
import PropTypes from "prop-types";

const FileUpload = ({ name, accept = "*/*", imageUrl }) => {
  const [dragging, setDragging] = React.useState(false);
  const input = React.useRef(null);

  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    input.current.click();
  };

  const handleDrag = (e, status) => {
    e.stopPropagation();
    e.preventDefault();
    setDragging(status);
  };

  const handleDrop = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setDragging(false);
    input.current.files = e.dataTransfer.files;
  };

  return (
    <label className="fileUpload">
      Picture
      {imageUrl && (
        <img
          onDragEnter={(e) => handleDrag(e, true)}
          onDragLeave={(e) => handleDrag(e, false)}
          onDrop={handleDrop}
          onClick={handleClick}
          src={imageUrl}
          alt="Event Picture"
        />
      )}
      <input type="file" name={name} accept={accept} ref={input} />
    </label>
  );
};

FileUpload.propTypes = {
  name: PropTypes.string.isRequired,
  accept: PropTypes.string,
  imageUrl: PropTypes.string,
};

export default FileUpload;
