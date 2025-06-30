import React from 'react';

export type SectionBackground = 'white' | 'gray' | 'mint' | 'gradient';

export interface SectionProps {
  children: React.ReactNode;
  id?: string;
  title?: string;
  description?: string;
  background?: SectionBackground;
  className?: string;
  role?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

const Section: React.FC<SectionProps> = ({ 
  children, 
  id, 
  title, 
  description,
  background = 'white',
  className = '',
  ...props 
}) => {
  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    mint: 'bg-mint bg-opacity-5',
    gradient: 'bg-gradient-to-b from-mint/30 to-white'
  };

  const classes = `py-16 md:py-24 ${backgroundClasses[background]} ${className}`;

  return (
    <section id={id} className={classes} {...props}>
      <div className="container mx-auto px-4 md:px-6">
        {(title || description) && (
          <div className="text-center mb-12">
            {title && <h2 className="section-title">{title}</h2>}
            {description && <p className="section-description">{description}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;