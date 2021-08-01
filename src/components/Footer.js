import React from "react";
import { Typography } from "@material-ui/core";

// Footer consists of copyright.
const Footer = () => {
  return (
    <Typography
      variant="body2"
      color="white"
      align="center"
      style={{ padding: 50 }}
    >
      {"Copyright © "}
      Team Eclipse {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Footer;
