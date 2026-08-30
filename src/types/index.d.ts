import { ReactNode, CSSProperties, HTMLAttributes } from "react";
import { HTMLMotionProps } from "framer-motion";

declare global {
  declare module 'maath/random/dist/maath-random.esm';

  interface Experience {
    role: string;
    company: string;
    duration: string;
    logo: string;
    points: string[];
    url: string;
  }

  interface Project {
    title: string;
    description: string;
    git: string;
    technologies: string[];
    image: string;
    alt: string;
    link?: string;
  }

  interface Skill {
    title: string;
    image: string;
    category: string;
    alt: string;
  }

  interface AnimatedButtonProps {
    defaultText: string;
    defaultIcon?: ReactNode;
    onClick?: () => void;
    style?: CSSProperties;
  }

  interface ButtonLinkProps {
    url: string;
    text: string;
    padding?: string;
    className?: string;
  }

  interface SurfaceProps extends HTMLMotionProps<"div"> {
    hoverable?: boolean;
    className?: string;
    children?: ReactNode;
  }

  type TextComponentType = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';

  interface TextProps extends HTMLAttributes<HTMLElement> {
    as?: TextComponentType;
    className?: string;
    children?: ReactNode;
  }

  interface AnimatedTextProps extends Omit<HTMLMotionProps<"p">, "children"> {
    as?: TextComponentType;
    className?: string;
    children?: ReactNode;
  }

  interface MenuItem {
    label: string;
    shortcut?: string;
    action?: () => void;
    separator?: boolean;
  }

  // --- Arcade Theme Types ---
  type GameMode = 'menu' | 'shooter' | 'novel';

  interface ArcadeMenuProps {
    onSelectGame: (game: GameMode) => void;
  }

  interface SpaceShooterProps {
    onExit: () => void;
  }

  interface VisualNovelProps {
    onExit: () => void;
  }

  type GameObject = {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    active: boolean;
  };

  type Asteroid = GameObject & {
    speed: number;
    data: any; 
    type: 'project' | 'skill';
  };

  type Projectile = GameObject & {
    speed: number;
  };

  type VisualNovelNode = {
    id: string;
    text: string;
    options: { label: string; targetId: string }[];
  };
}

export {};
