import React from "react";
import logo from "../../images/Logo.svg";
import classes from "./header.module.css";
const Header = () => {
  return (
    <img className={`${classes.main_logo} center`} src={logo} alt="Логотип" />
  );
};
export default Header;
