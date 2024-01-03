import React from 'react';
import { Button } from "@mui/material";
import "./MainButton.scss";

const MainButton = ({ text, onClick, className, icon }) => {
  return (
    <Button
      //  className="login_button" 
      onClick={onClick}
      className={`login_button ${className}`} >
      {text} {icon}
    </Button>
  );
};

export default MainButton;
