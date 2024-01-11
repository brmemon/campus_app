import React from 'react';
import { Button } from "@mui/material";
import "../../../styles/scss/MainButton.scss";

const MainButton = ({ text, onClick, className, icon, type }) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      className={`login_button ${className}`} >
      {icon}
      {text}
    </Button>
  );
};

export default MainButton;
