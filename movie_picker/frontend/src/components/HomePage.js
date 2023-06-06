import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header style={headerStyles}>
      <h1 style={titleStyles}>Movie Picker</h1>
    </header>
  );
};

const Footer = () => {
  return (
    <footer style={footerStyles}>
      <p style={footerTextStyles}>&copy; 2023 Movie Picker. All rights reserved.</p>
    </footer>
  );
};

const HomePage = () => {
  return (
    <div style={pageStyles}>
      <Header />
      <div style={contentContainerStyles}>
        <Grid container spacing={1} style={contentStyles}>
          <Grid item xs={12} align="center">
            <Typography variant="h4" style={welcomeStyles}>
              Welcome to our Movie Picker
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Typography variant="body1" style={descriptionStyles}>
              Test your movie taste with our short quiz. Just a few questions and we will choose a movie for you.
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Button variant="contained" color="primary" component={Link} to="/movieTest" style={buttonStyles}>
              Take Test
            </Button>
          </Grid>
        </Grid>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;

// Стилі для сторінки
const pageStyles = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh"
};

// Стилі для заголовку
const headerStyles = {
  background: "#222",
  padding: "20px",
  textAlign: "center",
};

const logoStyles = {
  width: "80px",
  height: "80px",
};

const titleStyles = {
  color: "#fff",
  fontSize: "24px",
  marginTop: "10px",
};

// Стилі для підвалу
const footerStyles = {
  background: "#222",
  padding: "10px",
  textAlign: "center",
};

const footerTextStyles = {
  color: "#fff",
};

// Стилі для контенту
const contentContainerStyles = {
  flex: "1",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const contentStyles = {
  width: "100%",
  maxWidth: "600px",
  padding: "0 20px",
  textAlign: "center",
};

const welcomeStyles = {
  fontSize: "24px",
};

const descriptionStyles = {
  margin: "10px 0",
};

const buttonStyles = {
  marginTop: "20px",
  width: "100%",
};
