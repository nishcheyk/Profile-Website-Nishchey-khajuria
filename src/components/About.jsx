import React from "react";
import { summary } from "../constants";
import "../App.css";
import ButtonLink from "./ButtonLink";
import Footer from "./Footer";
import AnimatedButton from "./AnimatedButton";


const About = () => {
  return (
    <div>
      <div
        className="bg-black h-[calc(100vh)] w-full text-white sm:flex sm:justify-around about  pt-40 overflow-x-hidden"
        id="about"
      >
        {" "}
        {/* Increased py-8 to py-12 and adjusted pt-190px to pt-20 */}
        <div className="flex flex-col justify-around">
          <div className="sm:px-16 px-2 text-center">
            {" "}
            {/* Center align the content */}
            <h2 className="text-4xl sm:text-5xl font-extrabold mt-2">
              Introduction
            </h2>
            <p className="mt-3 mb-6 text-[17px] max-w-3xl leading-[30px]">
              {summary}
            </p>
            <div className="flex justify-center mt-8">
              <AnimatedButton
                defaultText="View Resume"
                defaultIcon={
                  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g style={{ filter: "url(#about-shadow)" }}>
                      <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" fill="black"></path>
                    </g>
                    <defs>
                      <filter id="about-shadow">
                        <feDropShadow dx="0" dy="1" stdDeviation="0.6" floodOpacity="0.5" />
                      </filter>
                    </defs>
                  </svg>
                }
                onClick={() => window.open('https://drive.google.com/file/d/10gwidHSKJLRRIazpPLtXhlfWXijaIz_S/view?usp=sharing', '_blank')}
                style={{ minWidth: "220px" }}
              />
            </div>
          </div>
          <div className="mt-20 flex justify-center flex-wrap gap-7">

          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
