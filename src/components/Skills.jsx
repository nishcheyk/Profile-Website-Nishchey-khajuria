import React from "react";
import { skills } from "../constants";


const Skills = () => {
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
        {skills.map((skill, index) => (
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
              <img
                className="rounded-t-lg h-auto object-cover"
                src={skill.image}
                alt={skill.alt || skill.title}
                loading="lazy"
                style={{ width: "50%", height: "auto" }}
                onError={(e) => {
                    e.target.src = "https://cdn.simpleicons.org/probot/000000";
                }}
              />

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
                justifyContent: "flex-start", 
                textAlign: "center",
                overflowY: "auto",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <h5
                className="card__title"
                style={{
                  margin: "0",
                  fontSize: "28px",
                  color: "#fff",
                  fontWeight: "700",
                }}
              >
                {skill.title}
              </h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
