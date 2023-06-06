import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage"
import MovieTestPage from "./MovieTestPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movieTest" element={<MovieTestPage />} />
      </Routes>
    </Router>
  );
};

render(<App />, document.getElementById("app"));
