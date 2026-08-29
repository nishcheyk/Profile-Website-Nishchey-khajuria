import React from 'react';

interface SaasSectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  center?: boolean;
}

export function SaasSection({ children, id, className = '', center = false }: SaasSectionProps) {
  return (
    <section
      id={id}
      className={`py-16 md:py-32 px-4 md:px-6 lg:px-12 w-full max-w-7xl mx-auto ${center ? 'flex flex-col items-center' : ''} ${className}`}
    >
      {children}
    </section>
  );
}

interface SaasSectionHeadingProps {
  title: string;
  subtitle: string;
}

export function SaasSectionHeading({ title, subtitle }: SaasSectionHeadingProps) {
  return (
    <div className="text-center mb-12 md:mb-16">
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">{title}</h2>
      <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto">{subtitle}</p>
    </div>
  );
}
