import React, { memo } from 'react';

interface ClassificationBadgeProps {
  classification: 'normal' | 'high' | 'critical';
  description: string;
}

const ClassificationBadge: React.FC<ClassificationBadgeProps> = memo(({ 
  classification, 
  description 
}) => {
  const getClassificationStyle = (level: string) => {
    switch (level) {
      case 'normal':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'high':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className={`inline-flex items-center px-4 py-2 rounded-full border-2 font-medium ${getClassificationStyle(classification)}`}>
      {description}
    </div>
  );
});

ClassificationBadge.displayName = 'ClassificationBadge';

export default ClassificationBadge;