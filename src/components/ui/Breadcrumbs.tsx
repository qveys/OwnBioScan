import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
  isActive?: boolean;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = memo(({ items, className = '' }) => {
  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Fil d'Ariane">
      <Link 
        to="/" 
        className="flex items-center text-text-secondary hover:text-primary transition-colors"
        aria-label="Retour à l'accueil"
      >
        <Home className="w-4 h-4" />
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-4 h-4 text-text-secondary" />
          {item.path && !item.isActive ? (
            <Link 
              to={item.path}
              className="text-text-secondary hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className={item.isActive ? 'text-primary font-medium' : 'text-text-secondary'}>
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
});

Breadcrumbs.displayName = 'Breadcrumbs';

export default Breadcrumbs;