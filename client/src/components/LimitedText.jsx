import React from "react";

const LimitedText = ({ text }) => {
  const displayText = text.length > 100 ? text.slice(0, 100) + "..." : text;

  return (
    <div>
      <p>{displayText}</p>
    </div>
  );
};

export default LimitedText;
