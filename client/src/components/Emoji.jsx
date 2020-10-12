import React from "react";
import PropTypes from "prop-types";

export const emojis = {
  "waving-hand": "👋",
  chart: "📈",
  "wings-money": "💸",
  tada: "🎉",
  sad: "😞",
  check: "✔️"
};

const Emoji = ({ type = "" }) => (
  <span role="img" aria-labelledby="jsx-a11y/accessible-emoji">
    {emojis[type]}
  </span>
);

Emoji.propTypes = {
  type: PropTypes.string.isRequired
};

export default Emoji;
