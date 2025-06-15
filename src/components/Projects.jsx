import React from "react";
import vpn from "../assets/vpn.png";
import copeople from "../assets/copeople.png";
import JSbanking from "../assets/JSbank.png";
import noImage from "../assets/noImage.png";
import volumeControl from "../assets/volumeControl.png";
import eCom from "../assets/eCom.png";
import socialMedia from "../assets/SocialMedia.png";
import tictaktoe from "../assets/tictaktoe.png";
import Footer from "./Footer";

const Projects = () => {
  const projects = [
    {
      title: "JS banking",
      description:
        "A banking management system for handling customer accounts,Download account statements through gmail,OTP-based password reset, transactions and customer service operations.",
      image: JSbanking,
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
      title: "Workout Tracker",
      description:
        "A full-stack MERN application to log workouts, track progress, and monitor fitness goals over time.",
      image: noImage,
      git: "https://github.com/nishcheyk/Workout",
      technologies: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT"],
    },
    {
      title: "Thapar-links",
      description:
        "Full-stack web application to create public/private account (accept other) users, follow request posts, photos, shares, comments, etc.",
      image: socialMedia,
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
      title: "Railway Management System",
      description:
        "A full-stack application for managing train schedules, bookings, and user authentication for a railway system.",
      image: noImage,
      git: "https://github.com/nishcheyk/railwaymanagement",
      technologies: ["Node.js", "Express.js", "MongoDB", "EJS", "Bootstrap"],
    },
    {
      title: "Immigration Portal",
      description:
        "Web-based immigration management system to track applications, user roles, and verification steps.",
      image: noImage,
      git: "https://github.com/nishcheyk/immigration",
      technologies: ["Node.js", "Express.js", "MongoDB", "React.js", "JWT"],
    },
    {
      title: "PDF Document Assignment Tool",
      description:
        "Automated tool to assign and extract content from PDF documents, useful in data processing and distribution.",
      image: noImage,
      git: "https://github.com/nishcheyk/pdf-Docassignment",
      technologies: ["Node.js", "pdf2table", "Express.js", "Multer"],
    },
    {
      title: "Data Science Projects",
      description:
        "A collection of data science and machine learning projects using Python for prediction, analysis, and visualization.",
      image: noImage,
      git: "https://github.com/nishcheyk/Data-science",
      technologies: ["Python", "Pandas", "Scikit-learn", "Matplotlib", "Jupyter"],
    },
    {
      title: "Asankart",
      description:
        "Provides a platform for users to browse and purchase products online. Incorporates features such as product listings, search functionality, user authentication, and shopping cart management.",
      image: eCom,
      git: "https://github.com/nishcheyk/Asankart-Website",
      technologies: ["MongoDB", "Express.js", "React.js"],
    },
    {
  title: "Real-Time Chat App",
  description:
    "A real-time multi-user chat application using Socket.IO. Features include private messaging, online presence indicators, and group chats.",
  image: noImage,  // Add a suitable image to your assets folder
  git: "https://github.com/nishcheyk",
  technologies: ["Node.js", "Express", "Socket.IO", "React", "CSS"],
},

    {
      title: "Volume Control through Hand Gestures",
      description:
        "Controls volume using hand gestures, tracking hand movements via webcam feed and adjusting volume based on finger distance.",
      image: volumeControl,
      git: "https://github.com/example/volume-control",
      technologies: ["MediaPipe", "OpenCV"],
    },
    {
      title: "Library Management System",
      description:
        "A system for managing library operations, including book management, member management, and borrowing/returning books.",
      image: noImage,
      git: "https://github.com/nishcheyk/UI-UX-project/tree/main/Library-Management-System/Library-Management-System-master",
      technologies: ["Java", "MySQL"],
    },
    {
      title: "Blood Bank Management System",
      description:
        "An online system for managing blood bank operations, including donor registration, blood collection, and inventory management.",
      image: noImage,
      git: "https://github.com/nishcheyk/UI-UX-project/tree/main/Blood%20bank%20mangement%20sysytem",
      technologies: ["PHP", "MySQL"],
    },
    {
      title: "tic tak toe",
      description:
        "For a Tic-Tac-Toe game that supports 3x3 and 4x4 grids. Players alternate turns, aiming to align three or four symbols (X or O) horizontally, vertically, or diagonally, with real-time updates and bug-free functionality.",
      image: tictaktoe,
      git: "https://github.com/nishcheyk/tick-tak-toe-VB.NET-pc.git",
      technologies: ["VB.net"],
    },
  ];

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
          alignItems: "flex-start",
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
              height: "300px", // fixed card height
              backgroundColor: "#000",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 0 20px 5px rgba(8, 131, 149, 0.6)",
              transition:
                "all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              margin: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              color: "#fff",
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
                className="project-image"
                src={project.image}
                alt={project.title}
                style={{
                  width: "100%",
                  height: "220px", // fixed image height
                  objectFit: "cover",
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                }}
              />
            </a>

            {/* Title always visible */}
            <h5
              className="card__title"
              style={{
                margin: "15px 0 10px",
                fontSize: "20px",
                fontWeight: "700",
                textAlign: "center",
                minHeight: "56px", // reserve vertical space for consistent alignment
                lineHeight: "1.2",
                padding: "0 10px",
              }}
            >
              {project.title}
            </h5>

            {/* Hover content */}
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
                backgroundColor: "rgba(0, 0, 0, 0.85)",
                transform: "rotateX(-90deg)",
                transformOrigin: "bottom",
                transition:
                  "all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                textAlign: "center",
                overflowY: "auto",
                borderRadius: "10px",
                color: "#fff",
              }}
            >
              <p
                className="card__description"
                style={{
                  margin: "10px 0 10px",
                  fontSize: "13px",
                  lineHeight: "1.4",
                  flexGrow: 1,
                }}
              >
                {project.description}
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "6px",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "12px",
                      background: "#777",
                      color: "white",
                      fontSize: "12px",
                      whiteSpace: "nowrap",
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
                  padding: "10px 20px",
                  marginTop: "15px",
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
