import React from "react";

import Footer from "./Footer";
import ReactJS from "../assets/Skills/reactjs.svg";
import NodeJS from "../assets/Skills/nodejs.svg";
import ExpressJS from "../assets/Skills/expressjs.svg";
import Django from "../assets/Skills/django.svg";
import HTML from "../assets/Skills/html.svg";
import CSS from "../assets/Skills/css.svg";
import TailwindCSS from "../assets/Skills/tailwindcss.svg";
import Axios from "../assets/Skills/axios.svg";
import JWT from "../assets/Skills/jwt.svg";
import Bcrypt from "../assets/Skills/bcrypt.svg";
import Redux from "../assets/Skills/redux.svg";
import Multer from "../assets/Skills/multer.svg";
import Pdf2Table from "../assets/Skills/pdf2table.svg";
import ReactQuill from "../assets/Skills/reactquill.svg";
import TinyMCE from "../assets/Skills/tinymce.png";
import OpenCV from "../assets/Skills/opencv.svg";
import MediaPipe from "../assets/Skills/mediapipe.svg";
import MySQL from "../assets/Skills/mysql.svg";
import MongoDB from "../assets/Skills/mongodb.svg";
import Python from "../assets/Skills/python.svg";
import JQuery from "../assets/Skills/jquery.svg";
import C from "../assets/Skills/c.svg";
import Cpp from "../assets/Skills/cpp.svg";
import JavaScript from "../assets/Skills/javascript.svg";
import Postman from "../assets/Skills/postman.svg";
import VSCode from "../assets/Skills/vscode.svg";
import Render from "../assets/Skills/render.svg";
import Vercel from "../assets/Skills/vercel.svg";
import GitHub from "../assets/Skills/github.svg";
import { render } from "@testing-library/react";

const Projects = () => {
  const projects = [
    {
      title: "ReactJS",
      description:
        "Built responsive web apps using React.js with components, hooks, and API integration.",
      image: ReactJS,

    },
    {
      title: "NodeJs",
      description:
        "Developed backend APIs using Node.js with Express, MongoDB, and JWT authentication.",
      image: NodeJS,
    },
    {
      title:"ExpressJs",
      description:
        "Built RESTful APIs with Express.js for handling routes, middleware, and backend logic.",
      image: ExpressJS,
    },

    {
      title: "Django",
      description:
        "Developed secure and scalable web applications using Django with REST APIs and ORM integration.",
      image: Django,

    },
     {
      title:"Html",
      description:
        "Structured responsive web pages using semantic HTML for clean and accessible layouts",
      image: HTML,
    },
     {
      title: "CSS",
      description:
        "Styled modern web pages using CSS with flexbox, grid, and responsive design techniques.",
      image: CSS,
    },
    {
       title: "Tailwind CSS",
      description:
        "Styled responsive and modern UIs using Tailwind CSS utility-first classes.",
      image: TailwindCSS,
    },
        {
       title: "Axios",
      description:
        "Used Axios for making HTTP requests and integrating frontend with RESTful APIs",
      image: Axios,
    },
        {
       title: "JWT",
      description:
        "Implemented secure user authentication and authorization using JWT in web applications",
      image: JWT,
    },
        {
       title: "Bcrypt",
      description:
        "Used bcrypt for hashing and securing user passwords in authentication systems.",
      image: Bcrypt,
    },
      {
       title: "Multer",
      description:
        "Handled file uploads in Node.js applications using Multer middleware.",
      image: Multer,
    },
      {
       title: "Redux",
      description:
        "Managed global state in React applications using Redux for predictable state updates.",
      image: Redux,
    },
      {
       title: "pdf2table",
      description:
        "Extracted tabular data from PDF files using pdf2table in Node.js for structured data processing.",
      image: Pdf2Table,

    },
  {
       title: "React Quill",
      description:
        "Integrated rich text editing in React applications using ReactQuill with custom toolbar options.",
      image: ReactQuill,

    },
  {
       title: "TinyMCE",
      description:
        "Integrated TinyMCE for rich text editing with customizable plugins and toolbar in web applications.",
      image: TinyMCE,

    },
    {      title: "OpenCv",
      description:
        "Used OpenCV for image processing, object detection, and real-time computer vision tasks with Python",
      image: OpenCV,

    },
    {
      title: "Mediapie",
      description: "Implemented real-time face, hand, and pose tracking using MediaPipe for computer vision applications",
      image: MediaPipe,

    },
    {
      title: "MySql ",
      description:
        "Designed and queried relational databases using MySQL for structured data storage and retrieval.",
      image: MySQL,

    },
    {
      title: "MongoDB ",
      description:
        "Worked with MongoDB for storing and managing NoSQL data using Mongoose in Node.js applications.",
      image: MongoDB,

    },
     {
      title: "Python",
      description:
        "Developed automation scripts, backend logic, and AI applications using Python.",
      image: Python,

    },
      {
       title: "Jquery",
      description:
        "Used jQuery for DOM manipulation, event handling, and enhancing UI interactions in web applications.",
      image: JQuery,

    },{
      title: "C",
      description:
        "Wrote efficient programs in C for problem-solving, memory management, and system-level logic.",
      image: C,

    },{
      title: "C++",
      description:
        "Developed applications using C++ with object-oriented programming, STL, and data structure implementation.",
      image: Cpp,

    },
 {
      title: "JavaScript",
      description:
        "Built dynamic and interactive web features using JavaScript for client-side functionality.",
      image: JavaScript,

    },
     {
      title: "Postman",
      description:"Used Postman to test, debug, and document RESTful APIs during backend development.",
      image: Postman,
    },
     {
      title: "VsCode",
      description:
        "Used Visual Studio Code as the primary code editor with extensions for efficient development and debugging.",
      image: VSCode,


    },
     {
      title: "Render",
      description:
        "Deployed full-stack web applications on Render with automated builds and custom domain setup",
      image: Render,

    },
     {
      title: "Vercel",
      description:
        "Deployed frontend applications using Vercel with CI/CD integration and custom domain support.",
      image: Vercel,

    },
     {
      title: "GitHub",
      description:
        "Used GitHub for version control, collaboration, and managing code repositories with Git",
      image: GitHub,

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
              width: "250px",
              height: "230px",
              backgroundColor: "#fff",
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
          <div className="flex justify-center items-start">
  <img
    className="rounded-t-lg h-auto object-cover"
    src={project.image}
    alt=""
    style={{ width: "50%", height: "auto" }}
  />
</div>

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
                    fontSize: "28px",
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
                  fontSize: "19px",
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
                  gap: "25px",
                  marginTop: "10px",
                }}
              >

              </div>

            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Projects;
