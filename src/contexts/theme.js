import { createContext } from "react";

export const ThemeContext = createContext();

export const Themes = {
  dark: "DARK",
  light: "LIGHT",
};

export const initialState = Themes.dark;
