import React, { Suspense, lazy } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Background from "./components/Background";
import ErrorBoundary from "./components/ErrorBoundary";
import Loader from "./components/Loader";
import "./App.css";

// Lazy loading components for performance
const Home = lazy(() => import("./components/Home"));
const About = lazy(() => import("./components/About"));
const Skills = lazy(() => import("./components/Skills"));
const Experience = lazy(() => import("./components/Experience"));
const Projects = lazy(() => import("./components/Projects"));
const Contact = lazy(() => import("./components/Contact"));

// Loading component for Suspense fallback

const LoadingFallback = () => (
  <Loader />
);

function App() {
  return (
    <ErrorBoundary>
      <div className="relative z-0 bg-transparent overflow-x-hidden min-h-screen">
        <Navbar />
        <div className="area fixed inset-0 z-[-1]">
          <Background />
        </div>



        <main className="relative z-10 w-full">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
