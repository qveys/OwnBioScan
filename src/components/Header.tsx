import React, { useState, memo, useCallback, useEffect } from 'react';
import { Activity, Menu, X } from 'lucide-react';
import { useScrollEffect } from '../hooks/useScrollEffect';
import { useMediaQuery } from '../hooks/useMediaQuery';
import Button from './common/Button';

const Header: React.FC = memo(() => {
  const isScrolled = useScrollEffect(10);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Fermer le menu lors du redimensionnement vers desktop
  useEffect(() => {
    if (!isMobile && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isMobile, isMenuOpen]);

  // Gestion de l'accessibilité clavier
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isMenuOpen]);

  // Prévenir le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Skip link pour l'accessibilité */}
      <a 
        href="#main-content" 
        className="skip-link"
        onFocus={(e) => e.target.scrollIntoView()}
      >
        Aller au contenu principal
      </a>
      
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-classic ${
          isScrolled ? 'bg-white shadow-subtle py-2' : 'bg-transparent py-4'
        }`}
        role="banner"
        onKeyDown={handleKeyDown}
      >
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          {/* Logo */}
          <a 
            href="/" 
            className="flex items-center gap-2 text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-md p-1"
            aria-label="OwnBioScan - Retour à l'accueil"
          >
            <Activity className="h-8 w-8" aria-hidden="true" />
            <span className="text-xl font-montserrat font-bold uppercase">OwnBioScan</span>
          </a>

          {/* Bouton menu mobile */}
          <button 
            className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 touch-target"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            type="button"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>

          {/* Menu desktop */}
          <nav 
            className="hidden md:flex items-center gap-8"
            role="navigation"
            aria-label="Navigation principale"
          >
            <a 
              href="#benefits" 
              className="text-text-primary hover:text-primary transition-all duration-classic focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-md px-2 py-1"
            >
              Benefits
            </a>
            <a 
              href="#how-it-works" 
              className="text-text-primary hover:text-primary transition-all duration-classic focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-md px-2 py-1"
            >
              How It Works
            </a>
            <a 
              href="#testimonials" 
              className="text-text-primary hover:text-primary transition-all duration-classic focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-md px-2 py-1"
            >
              Testimonials
            </a>
            <Button 
              variant="primary" 
              href="/demo"
              aria-label="Essayer la démonstration"
            >
              Try the Demo
            </Button>
          </nav>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
              onClick={closeMenu}
              aria-hidden="true"
            />
            
            {/* Menu panel */}
            <div 
              id="mobile-menu"
              className="absolute top-full left-0 w-full bg-white shadow-lg py-4 md:hidden animate-slide-in-right"
              role="navigation"
              aria-label="Menu mobile"
            >
              <div className="container mx-auto px-4 flex flex-col gap-4">
                <a 
                  href="#benefits" 
                  onClick={closeMenu} 
                  className="text-text-primary hover:text-primary transition-all duration-classic py-3 border-b border-text-secondary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-md px-2"
                >
                  Benefits
                </a>
                <a 
                  href="#how-it-works" 
                  onClick={closeMenu} 
                  className="text-text-primary hover:text-primary transition-all duration-classic py-3 border-b border-text-secondary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-md px-2"
                >
                  How It Works
                </a>
                <a 
                  href="#testimonials" 
                  onClick={closeMenu} 
                  className="text-text-primary hover:text-primary transition-all duration-classic py-3 border-b border-text-secondary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-md px-2"
                >
                  Testimonials
                </a>
                <Button 
                  variant="primary" 
                  href="/demo" 
                  className="text-center mt-2"
                  onClick={closeMenu}
                  aria-label="Essayer la démonstration"
                >
                  Try the Demo
                </Button>
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
});

Header.displayName = 'Header';

export default Header;