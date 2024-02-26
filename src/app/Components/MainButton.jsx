import React from 'react';
import { Button } from "@mui/material";
import "../../../styles/scss/MainButton.scss";

const MainButton = ({ type, onClick, id, className, disabled, icon, text, }) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      id={id}
      className={`login_button ${className}`}
      disabled={disabled}>
      {icon}
      {text}
    </Button>
  );
};

export default MainButton;
