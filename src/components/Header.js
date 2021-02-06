import React from "react";

const Header = () => {
  return (
    <div style={headerStyle}>
      <h1>Welcome to your open sky dashboard</h1>
    </div>
  );
};

export default Header;

const headerStyle = {
  display: "flex",
  overflow: "hidden",
  justifyContent: "space-between",
  alignItems: "center",
};
