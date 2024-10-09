"use client";

import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { useHide, useToast } from "./hooks.js";

const Success = ({ message }) => {
  const { show, hide } = useToast(message);
  useHide(hide, 5000);

  if (show) {
    return (
      <p className="toast success" onClick={hide}>
        {message}
        <FontAwesomeIcon className="close" icon={faTimesCircle} />
      </p>
    );
  }
};

Success.propTypes = {
  message: PropTypes.string,
};

export default Success;
