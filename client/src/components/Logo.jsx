import React from "react";
import PropTypes from "prop-types";

export const Logo = ({ merchName }) => (
  <div className="logo">
    <p className="logo-merch-name">{merchName.charAt(0).toUpperCase()}</p>
  </div>
);

Logo.propTypes = {
  merchName: PropTypes.string.isRequired
};

export default Logo;
