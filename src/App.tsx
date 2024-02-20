import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import AboutSection from "./pages/AboutPage";
import SignInPage from "./pages/SignInPage";
import SignupPage from "./pages/SignupPage";
import BlogPage from "./pages/BlogPage";
import BlogDetails from "./pages/BlogDetails";
import ProfilePage from "./pages/ProfilePage";
import MyBlogPage from "./pages/MyBlogPage";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/check" element={<MyBlogPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile/:uuid" element={<ProfilePage />} />
        <Route path="/about" element={<AboutSection />} />
        <Route path="/blog/:uuid" element={<BlogDetails />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/user/:uuid" element={<MyBlogPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
