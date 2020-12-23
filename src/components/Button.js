import React from "react";

export const Button = ({ backgroundColor, text }) => {
  return (
    <button style={backgroundColor && { backgroundColor }} type="button">
      {text}
    </button>
  );
};
