import React from "react";

const MenuButton = ({ menuOpen }) => {
  return (
    <>
      <svg
        className={`ham hamRotate ham4 ${menuOpen ? "active" : ""}`}
        viewBox="0 0 100 100"
        width="50"
      >
        <path
          className="line top"
          style={{ stroke: "black" }}
          d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20"
        />
        <path
          className="line middle"
          d="m 70,50 h -40"
          style={{ stroke: "black" }}
        />
        <path
          className="line bottom"
          style={{ stroke: "black" }}
          d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20"
        />
      </svg>
    </>
  );
};

export default MenuButton;
