"use client";

/* eslint-disable no-unused-vars */ // remove once picture showing is implemented
import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowUp } from "@fortawesome/free-solid-svg-icons";

const FileUpload = ({
  name,
  accept = "*/*",
  imageUrl,
  title = "Upload file",
}) => {
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
    e.preventDefault();
    setDragging(false);
    input.current.files = e.dataTransfer.files;
  };

  return (
    <label
      // onDragEnter={(e) => handleDrag(e, true)}
      // onDragLeave={(e) => handleDrag(e, false)}
      // onDrop={handleDrop}
      className="fileUpload"
    >
      {title}
      {/* imageUrl && (
        <div className={`imageContainer ${dragging ? "dragging" : ""}`}>
          {dragging ? (
            <p>
              <FontAwesomeIcon icon={faFileArrowUp} />
              Drop Files Here to Upload Them
            </p>
          ) : (
            <img onClick={handleClick} src={imageUrl} alt="Event Picture" />
          )}
        </div>
      )*/}
      <input type="file" name={name} accept={accept} ref={input} />
    </label>
  );
};

FileUpload.propTypes = {
  name: PropTypes.string.isRequired,
  accept: PropTypes.string,
  imageUrl: PropTypes.string,
  title: PropTypes.string,
};

export default FileUpload;
