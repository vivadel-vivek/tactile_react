// Home page
import { useState, useContext } from "react";
import { Context as ThemeContext } from "context/ColorThemeContext";
import Navbar from "components/Navbar";

const Home = () => {
  const { state: theme } = useContext(ThemeContext);
  return (
    <>
      <Navbar theme={theme} />
      <h1>Home Page</h1>
    </>
  );
};

export default Home;
