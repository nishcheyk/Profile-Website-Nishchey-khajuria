import React from "react";
import { skills } from "../../data/constants";
import Surface from "../ui/Surface";
import Text from "../ui/Text";
import { StaggerContainer, AnimatedItem } from "../../animations/AnimatedComponents";

const Skills: React.FC = () => {
  return (
    <div className="relative min-h-[calc(100vh-80px)] py-24 px-4 max-w-7xl mx-auto">
      <StaggerContainer>
        <AnimatedItem animation="popIn">
          <Text as="h2" className="text-4xl sm:text-5xl font-extrabold text-center mb-16 uppercase">
            My <span className="text-accent">Skills</span>
          </Text>
        </AnimatedItem>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {skills.map((skill: Skill, index: number) => (
            <AnimatedItem animation="popIn" key={index} className="h-full">
              <Surface
                hoverable
                className="group relative flex flex-col items-center justify-center p-6 h-40 bg-surface/50 backdrop-blur-md"
              >
                <img
                  src={skill.image}
                  alt={skill.alt}
                  className="w-16 h-16 object-contain mb-4 transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://cdn.simpleicons.org/probot/000000";
                  }}
                />
                <Text className="text-sm font-medium text-center text-secondary group-hover:text-primary transition-colors">
                  {skill.title}
                </Text>
              </Surface>
            </AnimatedItem>
          ))}
        </div>
      </StaggerContainer>
    </div>
  );
};

export default Skills;

