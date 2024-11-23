import React from "react";
import vpn from "../assets/vpn.png";
import copeople from "../assets/copeople.png";
import JSbanking from"../assets/";

import Footer from "./Footer";

const Projects = () => {
  const projects = [
    {
      title: "JS banking",
      description:"A banking management system for handling customer accounts,Download account statements through gmail,OTP-based password reset, transactions and customer service operations.",
      image:JSbanking,
      git: "https://github.com/nishcheyk/banking",
      technologies: [
        "Node.js",
        "Express",
        "MongoDB",
        "React",
        "Tailwind CSS",
        "Axios",
        "MUI (Material UI)",
        "Backend",
        "JWT",
        "Bcrypt",
        "dotenv",
        "multer",
        "nodemailer",
        "pdfkit",
      ],
    },
    {
      title: "Thapar-links",
      description:
        "Full-stack web application to create public/private account (accept other) users, follow request posts, photos, shares, comments, etc.",
      image: copeople,
      git: "https://github.com/nishcheyk/Socail-media-project-using-MERN",
      technologies: [
        "MongoDB",
        "Express.js",
        "Redux",
        "Authentication",
        "React.js",
      ],
    },
    {
      title: "E-Commerce Website",
      description:
        "Provides a platform for users to browse and purchase products online. Incorporates features such as product listings, search functionality, user authentication, and shopping cart management.",
      image: vpn,
      git: "https://github.com/example/ecomm-project",
      technologies: ["MongoDB", "Express.js", "React.js"],
    },
    {
      title: "Social Media Website",
      description:
        "Full-stack web application for creating public/private accounts, user interactions (follow, posts, photos, shares, comments, etc.).",
      image: vpn,
      git: "https://github.com/example/social-media",
      technologies: ["MongoDB", "Express.js", "Redux"],
    },
    {
      title: "Volume Control through Hand Gestures",
      description:
        "Controls volume using hand gestures, tracking hand movements via webcam feed and adjusting volume based on finger distance.",
      image: vpn,
      git: "https://github.com/example/volume-control",
      technologies: ["MediaPipe", "OpenCV"],
    },
    {
      title: "Library Management System",
      description:
        "A system for managing library operations, including book management, member management, and borrowing/returning books.",
      image: copeople,
      git: "https://github.com/nishcheyk/UI-UX-project/tree/main/Library-Management-System/Library-Management-System-master",
      technologies: ["Java", "MySQL"],
    },
    {
      title: "Blood Bank Management System",
      description:
        "An online system for managing blood bank operations, including donor registration, blood collection, and inventory management.",
      image: copeople,
      git: "https://github.com/nishcheyk/UI-UX-project/tree/main/Blood%20bank%20mangement%20sysytem",
      technologies: ["PHP", "MySQL"],
    },
  ];

  // Determine which image to use based on the title
  const getProjectImage = (title) => {
    return title === "Snap Shot" ? copeople : vpn;
  };

  return (
    <div
      style={{
        backgroundColor: "black",
        minHeight: "100vh",
        overflow: "hidden",
        paddingBottom: "90px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1.75rem",
          justifyContent: "center",
          alignItems: "center",
          padding: "8rem 1rem 1rem",
        }}
      >
        {projects.map((project, index) => (
          <div
            key={index}
            className="card"
            style={{
              position: "relative",
              width: "350px",
              height: "300px",
              backgroundColor: "#000",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 0 20px 5px rgba(8, 131, 149, 0.6)",
              transition: "all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              margin: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.querySelector(".card__content").style.transform =
                "rotateX(0deg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.querySelector(".card__content").style.transform =
                "rotateX(-90deg)";
            }}
          >
            <a href="#">
              <img
                className="w-full rounded-t-lg h-auto object-cover"
                src={getProjectImage(project.title)}
                alt=""
                style={{ width: "100%", height: "auto" }}
              />
            </a>

            <div
              className="card__content"
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                padding: "20px",
                boxSizing: "border-box",
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                transform: "rotateX(-90deg)",
                transformOrigin: "bottom",
                transition: "all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start", // Adjusted to start from the top
                textAlign: "center",
                overflowY: "auto", // Enable scroll within content
                scrollbarWidth: "none", // Hide scrollbar for Firefox
                msOverflowStyle: "none", // Hide scrollbar for IE/Edge
              }}
            >
              <a href="#">
                <h5
                  className="card__title"
                  style={{
                    margin: "0",
                    fontSize: "20px",
                    color: "#fff",
                    fontWeight: "700",
                  }}
                >
                  {project.title}
                </h5>
              </a>
              <p
                className="card__description"
                style={{
                  margin: "10px 0 10px",
                  fontSize: "12px",
                  color: "#fff",
                  lineHeight: "1.4",
                }}
              >
                {project.description}
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "5px",
                  marginTop: "10px",
                }}
              >
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    style={{
                      padding: "5px 10px",
                      borderRadius: "8px",
                      background: "#777",
                      color: "white",
                      fontSize: "12px",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={project.git}
                style={{
                  display: "inline-block",
                  padding: "10px 15px",
                  marginTop: "10px",
                  borderRadius: "8px",
                  backgroundColor: "#333",
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: "14px",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#555";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#333";
                }}
              >
                Source Code
              </a>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Projects;
