import React from "react";
import { summary } from "../../data/constants";
import { FaGithub, FaInstagram } from "react-icons/fa";
import { AiFillLinkedin } from "react-icons/ai";
import { FiMail } from "react-icons/fi";
import Surface from "../ui/Surface";
import Text from "../ui/Text";
import { StaggerContainer, AnimatedItem } from "../../animations/AnimatedComponents";

const Contact: React.FC = () => {
  return (
    <div className="relative min-h-[calc(100vh-80px)] w-full flex flex-col items-center justify-center p-4 py-20" id="contact">
      <StaggerContainer>
        <AnimatedItem animation="popIn">
          <Text as="h2" className="text-4xl sm:text-5xl font-extrabold uppercase text-center mb-16">
            Get In <span className="text-accent">Touch</span>
          </Text>
        </AnimatedItem>
        
        <AnimatedItem animation="popIn">
          <Surface className="max-w-md w-full bg-surface/80 backdrop-blur-xl p-8 flex flex-col items-center text-center border-white/10 relative overflow-hidden">
            
            <a href="mailto:nishcheykhajuria@gmail.com" className="absolute top-6 right-6 text-secondary hover:text-primary transition-colors">
              <FiMail size={24} />
            </a>

            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-accent mb-6 shadow-[0_0_15px_rgba(251,109,72,0.4)]">
              <img
                src="https://avatars.githubusercontent.com/u/70341267?v=4"
                alt="Profile Pic"
                className="w-full h-full object-cover"
              />
            </div>

            <Text as="h3" className="text-2xl font-bold mb-2">
              Nishchey Khajuria
            </Text>
            <Text className="text-sm text-secondary mb-8 leading-relaxed">
              {summary}
            </Text>

            <div className="flex gap-4 mb-8">
              <a href="https://www.instagram.com/nishchey_khajuria/" target="_blank" rel="noopener noreferrer" className="p-3 bg-surfaceBorder rounded-full hover:bg-accent hover:text-background transition-colors text-white">
                <FaInstagram size={20} />
              </a>
              <a href="https://www.linkedin.com/in/nishchey-khajuria-26a0b4236/" target="_blank" rel="noopener noreferrer" className="p-3 bg-surfaceBorder rounded-full hover:bg-[#0077b5] hover:text-white transition-colors text-white">
                <AiFillLinkedin size={20} />
              </a>
              <a href="https://github.com/nishcheyk" target="_blank" rel="noopener noreferrer" className="p-3 bg-surfaceBorder rounded-full hover:bg-white hover:text-black transition-colors text-white">
                <FaGithub size={20} />
              </a>
            </div>

            <Surface hoverable className="px-8 py-3 bg-white text-black font-bold rounded-full w-full">
              +91 6005284228
            </Surface>
          </Surface>
        </AnimatedItem>
      </StaggerContainer>
    </div>
  );
};

export default Contact;

