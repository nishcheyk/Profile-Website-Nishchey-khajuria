import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { experiences } from "../constants";


const Experience = () => {
  return (
    <div
      className="experience bg-black w-screen min-h-screen text-white pt-4 pt-16 pb-24 overflow-x-hidden"
      id="experience"
    >
      <div className="pt-12 sm:px-16">

        <h2 className="text-4xl sm:text-5xl font-extrabold mt-8 ">
          MY JOURNEY SO FAR.
        </h2>
      </div>
      <VerticalTimeline className="mt-9">
        {experiences.map((experience) => (
          <VerticalTimelineElement
            className="relative vertical-timeline-element--work"
            contentStyle={{ background: "#1d1836", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid  #232631" }}
            date={experience.duration}
            iconStyle={{ background: "#2C3539" }}
            icon={
              <a
                className="flex justify-center items-center w-full h-full"
                href={experience.url}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={experience.logo}
                  alt={experience.company}
                  className="w-[70%] h-[70%] object-contain"
                  style={{ background: "white", borderRadius: "50%", padding: "2px", boxSizing: "border-box" }}
                  onError={(e) => {
                    e.target.src = "https://cdn.simpleicons.org/probot/000000";
                  }}
                />
              </a>
            }
          >
            <div>
              <h3 className="text-white text-[24px] font-bold tracking-tight">
                {experience.role}
              </h3>
              <a
                href={experience.url}
                target="_blank"
                rel="noreferrer"
                className="text-[#FB6D48] text-[18px] font-bold hover:underline"
              >
                {experience.company}
              </a>
            </div>

            <ul className="mt-6 list-disc ml-5 space-y-3">
              {experience.points.map((point, idx) => (
                <li
                  key={`experience-point-${idx}`}
                  className="text-white/80 text-[14px] pl-1 tracking-wide leading-relaxed"
                >
                  {point}
                </li>
              ))}
            </ul>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default Experience;
