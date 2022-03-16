import * as React from "react";
import { render as renderReactTestingLib } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1d9bf0",
    },
    black: {
      main: "#282d31",
      darker: "#0f1419",
    },
    grey: {
      main: "#536471",
      button: "#cfd9de",
      background__input: "#eff3f4",
      background__trend: "#f7f9f9",
    },
    white: {
      main: "#ffffff",
    },
  },
});

//ui est pour le composant que l'on veut utiliser et les options si ont a des props a passer en test
function render(ui, { ...options } = {}) {
  const Wrapper = ({ children }) => (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  );
  return renderReactTestingLib(ui, { wrapper: Wrapper, ...options });
}

export * from "@testing-library/react";
// surcharge de render avec le render modifier qui contient le context du theme
export { render };
