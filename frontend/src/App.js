import React, { useEffect } from 'react';
import './App.css';
import Header from "./component/layout/Header/Header.jsx"
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import WebFont from "webfontloader"
import Footer from "./component/layout/Footer/Footer.jsx"
import Home from "./component/Home/Home.js"


function App() {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
