import React from "react";
import PropTypes from "prop-types";
import Emoji from "./Emoji";

export const Header = ({ emoji, text }) => (
  <div className="py-3 text-secondary">
    <h5>{text} <Emoji type={emoji} /></h5>
  </div>
);

Header.propTypes = {
  text: PropTypes.string.isRequired,
  emoji: PropTypes.string
};

export default Header;
