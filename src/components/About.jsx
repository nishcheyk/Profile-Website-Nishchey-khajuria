import React from "react";
import "../App.css";
import ButtonLink from "./ButtonLink";
import Footer from "./Footer";

const ServiceCard = () => (
  <div className="sm:w-[250px] w-full">
    <div className="w-full green-pink-gradient p-[1px] rounded-[20px]">
      <div
        className="rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
        style={{ background: "#151030" }}
      >
        <h3 className="text-white text-[20px] font-bold text-center"></h3>
      </div>
    </div>
  </div>
);

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
            👨‍💻 Hey there! I'm Nishchey Khajuria, your friendly neighborhood full-stack developer with a passion for crafting sleek, responsive web apps that actually work (no broken links, promise!). My tech adventure kicked off with a geeky curiosity about what makes things tick behind the scenes—and now, I get to build them! 🚀
<br/><br/><br/>
            When I’m not glued to my screen debugging (or celebrating a successful deploy), you’ll catch me geeking out over new tech, diving into spicy tech blogs, or testing the limits of cool frameworks and libraries. Got a wild idea? Let’s team up and make some tech magic happen! 🌟
              <br/>
              <br/>
              <br/>
            </p>
            <ButtonLink
              url="https://drive.google.com/file/d/1rPivehDxn6zDD4YbL3lgKqTdprkja46Q/view?usp=sharing"
              text="View Resume →"
              padding={`p-4`}
            />
          </div>
          <div className="mt-20 flex justify-center flex-wrap gap-7">

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
