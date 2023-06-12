import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage"
import MovieTestPage from "./MovieTestPage";
import NavBar from "./NaviBar"
import 'bootstrap/dist/css/bootstrap.min.css';
import RandomMovie from "./RandomMoviePage";
import ResultPage from "./ResultPage"
import ProfileUserPage from "./ProfileUserPage";
import RegisterPage from "./RegisterPage";

const App = () => {
  return (
    <Router>
        <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="/movieTest" element={<MovieTestPage />} />
          <Route path="/randomMovie" element={<RandomMovie />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/profile" element={<ProfileUserPage />} />
          <Route path="/register" element={<RegisterPage />}/>
      </Routes>
    </Router>
  );
};

render(<App />, document.getElementById("app"));
