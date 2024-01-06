import React from 'react';
import { Button } from "@mui/material";
import styles from "../../../styles/scss/MainButton.module.scss";

const MainButton = ({ text, onClick, className, icon }) => {
  return (
    <Button
      onClick={onClick}
      className={`${styles.login_button} ${className}`} >
      {text}
      {icon}
    </Button>
  );
};

export default MainButton;
