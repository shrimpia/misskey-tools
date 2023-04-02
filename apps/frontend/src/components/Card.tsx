import React from 'react';

export type CardProps = {
	className?: string;
	bodyClassName?: string;
};

export const Card: React.FC<CardProps> = ({children, className, bodyClassName}) => {
  return (
    <div className={`card ${className}`}>
      <div className={`body ${bodyClassName}`}>
        {children}
      </div>
    </div>
  );
};
