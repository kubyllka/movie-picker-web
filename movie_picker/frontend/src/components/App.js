import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage"
import MovieTestPage from "./MovieTestPage";
import NavBar from "./NaviBar"
import 'bootstrap/dist/css/bootstrap.min.css';
import RandomMovie from "./RandomMoviePage";

const App = () => {
  return (
    <Router>
        <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movieTest" element={<MovieTestPage />} />
          <Route path="/login" element={<MovieTestPage />} />
          <Route path="/randomMovie" element={<RandomMovie />} />
      </Routes>
    </Router>
  );
};

render(<App />, document.getElementById("app"));
