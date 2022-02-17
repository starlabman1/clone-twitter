import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Prehome from "./pages/Prehome";
import SignUp from "./pages/SignUp/SingUp";
import Login from "./components/Login/Login";
import Home from "./pages/Home";

export default function App() {
  // Création d'un thème pour changer la couleur principale de MUI
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1d9bf0",
      },
      black: {
        main: "#282d31",
      },
      grey: {
        main: "#ccd6dd",
        darker: "#536471",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Prehome />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </ThemeProvider>
  );
}
