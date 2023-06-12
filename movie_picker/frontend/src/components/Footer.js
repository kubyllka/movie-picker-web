import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>© 2023 KubrickStare. All rights reserved.</p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#020202",
    padding: "20px",
    textAlign: "center",
  },
  text: {
    fontSize: "14px",
    color: "#ffffff",
  },
};

export default Footer;
