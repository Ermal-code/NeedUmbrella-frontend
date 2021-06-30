import React, { useContext } from "react";
import { Form } from "react-bootstrap";
import { ThemeContext, Themes } from "../contexts/theme";

export default function ToggleTheme() {
  const [theme, setTheme] = useContext(ThemeContext);

  console.log(theme);

  return (
    <Form>
      <Form.Check
        type="switch"
        id="custom-switch"
        label={`${theme === Themes.dark ? "Light Mode" : "Dark Mode"}`}
        checked={theme === Themes.light}
        onChange={() =>
          setTheme(theme === Themes.dark ? Themes.light : Themes.dark)
        }
      />
    </Form>
  );
}
