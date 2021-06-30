import React, { useContext } from "react";
import { ThemeContext, Themes } from "../contexts/theme";

const HeaderWithDarkMode = () => {
  const [theme, setTheme] = useContext(ThemeContext);
  return (
    <div className="headerUmb  text-light text-center p-2">
      <h1>DO I NEED AN UMBREALLA TODAY</h1>
      <button
        onClick={() =>
          setTheme(theme === Themes.dark ? Themes.light : Themes.dark)
        }
      >
        {theme === Themes.dark ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
};

export default HeaderWithDarkMode;
