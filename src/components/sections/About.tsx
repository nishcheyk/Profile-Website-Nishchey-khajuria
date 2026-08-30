import React from "react";
import { summary } from "../../data/constants";
import AnimatedButton from "../ui/AnimatedButton";
import { IconDownload } from "../ui/Icons";
import Text from "../ui/Text";
import { StaggerContainer, AnimatedItem } from "../../animations/AnimatedComponents";

const About: React.FC = () => (
  <div className="relative min-h-[calc(100vh-80px)] py-24 px-4 max-w-4xl mx-auto flex flex-col justify-center">
    <StaggerContainer className="text-center">
      <AnimatedItem>
        <Text as="h2" className="text-4xl sm:text-5xl font-extrabold mb-8 uppercase tracking-tighter">
          <span className="text-accent">Introduction</span>
        </Text>
      </AnimatedItem>

      <AnimatedItem>
        <Text className="text-lg sm:text-xl text-secondary leading-relaxed mb-12">
          {summary}
        </Text>
      </AnimatedItem>

      <AnimatedItem className="flex justify-center">
        <AnimatedButton
          defaultText="View Resume"
          defaultIcon={<IconDownload size={20} />}
          onClick={() => window.open('https://drive.google.com/file/d/10gwidHSKJLRRIazpPLtXhlfWXijaIz_S/view?usp=sharing', '_blank')}
        />
      </AnimatedItem>
    </StaggerContainer>
  </div>
);

export default About;
