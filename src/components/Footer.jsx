import React from "react";
import { FaGithub, FaInstagram } from "react-icons/fa";
import { AiFillLinkedin } from "react-icons/ai";
import { FiMail } from "react-icons/fi";

const Footer = () => {
  const year = new Date().getFullYear();

  const footerStyle = {
    position: "fixed", // Fixed position to always stick to the bottom
    bottom: "0",
    left: "0",
    width: "100%",
    backgroundColor: "rgba(30, 41, 59, 0.5)",
    height: "60px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
  };

  const iconContainerStyle = {
    display: "flex",
    alignItems: "center",
  };

  const iconStyle = {
    position: "relative",
    background: "#fff",
    borderRadius: "50%",
    margin: "5px",
    width: "40px",
    height: "40px",
    fontSize: "16px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 10px 10px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    transition: "all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  };

  const tooltipStyle = {
    position: "absolute",
    top: "-60px",
    left: "50%",
    transform: "translateX(-40%)",
    fontSize: "14px",
    background: "#fff",
    zIndex: "0",
    color: "#1e293b",
    padding: "8px 12px",
    borderRadius: "5px",
    boxShadow: "0 10px 10px rgba(0, 0, 0, 0.1)",
    opacity: "0",
    pointerEvents: "none",
    transition: "all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    visibility: "hidden",
  };

  const handleMouseEnter = (e) => {
    const tooltip = e.currentTarget.querySelector(".tooltip");
    tooltip.style.opacity = "1";
    tooltip.style.visibility = "visible";
    tooltip.style.pointerEvents = "auto";
  };

  const handleMouseLeave = (e) => {
    const tooltip = e.currentTarget.querySelector(".tooltip");
    tooltip.style.opacity = "0";
    tooltip.style.visibility = "hidden";
    tooltip.style.pointerEvents = "none";
  };

  return (
    <div style={footerStyle}>
      <div style={iconContainerStyle}>
        <div
          className="icon email"
          style={{ ...iconStyle, background: "#d44638" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <a
            href="mailto:nishcheycaptuer2014@gmail.com"
            style={{ textDecoration: "none", color: "#fff" }}
          >
            <FiMail />
          </a>
          <div
            className="tooltip"
            style={{ ...tooltipStyle, background: "#d44638", color: "white" }}
          >
            Email
          </div>
        </div>
        <div
          className="icon instagram"
          style={{ ...iconStyle, background: "#e4405f" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <a
            href="https://www.instagram.com/nishchey_khajuria/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "#fff" }}
          >
            <FaInstagram />
          </a>
          <div
            className="tooltip"
            style={{ ...tooltipStyle, background: "#e4405f", color: "white" }}
          >
            Instagram
          </div>
        </div>
        <div
          className="icon linkedin"
          style={{ ...iconStyle, background: "#0077b5" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <a
            href="https://www.linkedin.com/in/nishchey-khajuria-26a0b4236/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "#fff" }}
          >
            <AiFillLinkedin />
          </a>
          <div
            className="tooltip"
            style={{ ...tooltipStyle, background: "#0077b5", color: "white" }}
          >
            LinkedIn
          </div>
        </div>
        <div
          className="icon github"
          style={{ ...iconStyle, background: "#333" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <a
            href="https://github.com/nishcheyk"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "#fff" }}
          >
            <FaGithub />
          </a>
          <div
            className="tooltip"
            style={{ ...tooltipStyle, background: "#333", color: "white" }}
          >
            GitHub
          </div>
        </div>
      </div>
      <p
        className="text-white text-right text-xs font-light"
        style={{ marginRight: "10px" }}
      >
        © {year} Nishchey. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
