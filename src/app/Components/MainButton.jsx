import React from 'react';
import { Button } from "@mui/material";
import "../../../styles/scss/MainButton.scss";

const MainButton = ({ text, onClick, className, icon }) => {
  return (
    <Button
      onClick={onClick}
      className={`login_button ${className}`} >
      {icon}
      {text}
    </Button>
  );
};

export default MainButton;
