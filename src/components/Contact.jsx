import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import Background from "./Background";
const ContactCard = () => {
  return (
    <div className="card-container">
      <ul className="circles">
        <Background />
      </ul>
      <div className="card">
        <a href="mailto:nishcheykhajuria@gmail.com" className="mail">
          <svg
            className="lucide lucide-mail"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
            height="24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect rx="2" y="4" x="2" height="16" width="20"></rect>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
          </svg>
        </a>
        <div className="profile-pic">
          <img
            src="https://avatars.githubusercontent.com/u/70341267?v=4"
            alt="Profile Pic"
          />
        </div>
        <div className="bottom">
          <div className="content">
            <span className="name">Nishchey Khajuria</span>
            <span className="about-me">
              A full-stack developer and 4nd-year COE student at TIET with a
              Diploma in CSE from Govt Polytechnic Jammu, passionate about
              building dynamic web apps
            </span>
          </div>
          <div className="bottom-bottom">
            <div className="social-links-container">
              <a
                href="https://www.instagram.com/nishchey_khajuria/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon style={{ height: 24, width: 24 }} />
              </a>
              <a
                href="https://www.linkedin.com/in/nishchey-khajuria-26a0b4236/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon
                  style={{
                    fontSize: 24,
                    height: 24,
                    width: 24,
                    viewBox: "0 0 16 15.999",
                  }}
                />
              </a>
              <a
                href="https://github.com/nishcheyk"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon style={{ height: 24, width: 24 }}></GitHubIcon>
              </a>
            </div>
            <button className="button">+91 6005284228</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
