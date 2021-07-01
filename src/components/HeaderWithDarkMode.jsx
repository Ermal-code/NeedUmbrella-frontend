import React from "react";
import ToggleTheme from "./ToggleTheme";

const HeaderWithDarkMode = () => {
  return (
    <div className="headerUmb  text-light text-center p-2">
      <h1>DO I NEED AN UMBREALLA TODAY</h1>
      <div className="togglerPosition">
        <ToggleTheme />
      </div>
    </div>
  );
};

export default HeaderWithDarkMode;
