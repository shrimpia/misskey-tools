import React from 'react';

export type SkeletonProps = {
	width?: string | number;
	height?: string | number;
};

export const Skeleton: React.FC<SkeletonProps> = (p) => {
  return (
    <div className="skeleton" style={{width: p.width, height: p.height}}></div>
  );
};
