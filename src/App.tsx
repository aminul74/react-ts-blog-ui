import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import AboutSection from "./pages/AboutPage";
// import UserForm from "./components/UserForm";
import SignInPage from "./pages/SignInPage";
import SignupPage from "./pages/SignupPage";
// import BlogCard from "./components/BlogCard";
import BlogPage from "./pages/BlogPage";
import BlogDetails from "./pages/BlogDetails";
import ProfilePage from "./pages/ProfilePage";
// import Modal from "./components/Modal";
import FloatButton from "./components/FloatButton";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/check" element={<FloatButton />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/about" element={<AboutSection />} />
        <Route path="/blog/:uuid" element={<BlogDetails />} />
        <Route path="/blogs" element={<BlogPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
