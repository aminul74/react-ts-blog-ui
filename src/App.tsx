import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection"
import AboutSection from "./pages/AboutPage";
// import UserForm from "./components/UserForm";
import SignInPage from "./pages/SignInPage";
import SignupPage from "./pages/SignupPage"
import Accordion from "./components/BlogCard";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/about" element={<AboutSection />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/blogs" element={<Accordion />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
