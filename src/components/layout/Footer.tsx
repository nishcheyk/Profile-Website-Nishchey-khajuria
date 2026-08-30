import React from "react";
import { FaGithub, FaInstagram } from "react-icons/fa";
import { AiFillLinkedin } from "react-icons/ai";
import { FiMail } from "react-icons/fi";
import { motion } from "framer-motion";
import { useMotion } from "../../hooks/useMotion";
import Text from "../ui/Text";

const Footer: React.FC = () => {
  const { springs, reduced } = useMotion();
  const year = new Date().getFullYear();

  const links = [
    { name: "Email", icon: <FiMail size={18} />, url: "mailto:nishcheykhajuria@gmail.com", color: "hover:bg-red-500 hover:text-white" },
    { name: "Instagram", icon: <FaInstagram size={18} />, url: "https://www.instagram.com/nishchey_khajuria/", color: "hover:bg-pink-500 hover:text-white" },
    { name: "LinkedIn", icon: <AiFillLinkedin size={18} />, url: "https://www.linkedin.com/in/nishchey-khajuria-26a0b4236/", color: "hover:bg-[#0077b5] hover:text-white" },
    { name: "GitHub", icon: <FaGithub size={18} />, url: "https://github.com/nishcheyk", color: "hover:bg-gray-800 hover:text-white" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full h-16 bg-surface/50 backdrop-blur-md border-t border-surfaceBorder z-50 flex justify-between items-center px-4 sm:px-8">
      <div className="flex items-center gap-3">
        {links.map((link) => (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            title={link.name}
            className={`flex items-center justify-center w-10 h-10 rounded-full bg-white text-black transition-colors ${link.color} shadow-sm`}
            whileHover={!reduced ? { scale: 1.1 } : {}}
            whileTap={!reduced ? { scale: 0.95 } : {}}
            transition={springs.momentum}
          >
            {link.icon}
          </motion.a>
        ))}
      </div>
      
      <Text className="text-xs font-medium text-secondary">
        © {year} Nishchey. All rights reserved.
      </Text>
    </div>
  );
};

export default Footer;
