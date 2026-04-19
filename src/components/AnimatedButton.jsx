import React from "react";
import "./Contact.css";

const AnimatedButton = ({ defaultText, defaultIcon, onClick, style }) => {
  const renderText = (text) => {
    return text.split("").map((char, index) => (
      <span key={index} style={{ "--i": index }}>
        {char}
      </span>
    ));
  };

  return (
    <button className="send-button" onClick={onClick} style={style}>
      <div className="outline"></div>
      <div className="state state--default">
        <div className="icon">{defaultIcon}</div>
        <p>{renderText(defaultText)}</p>
      </div>
    </button>
  );
};

export default AnimatedButton;
