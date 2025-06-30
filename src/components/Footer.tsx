import React, { memo } from 'react';
import { Activity, Instagram, Twitter, Facebook, Youtube, Mail, Phone } from 'lucide-react';
import { FOOTER_CONTENT } from '../data/content';

const SocialLink: React.FC<{ href: string; icon: React.ComponentType<{ size?: number }> }> = memo(({ href, icon: Icon }) => (
  <a href={href} className="text-text-secondary hover:text-primary transition-all duration-classic">
    <Icon size={20} />
  </a>
));

SocialLink.displayName = 'SocialLink';

const Footer: React.FC = memo(() => {
  const { brand, links, contact, legal } = FOOTER_CONTENT;

  return (
    <footer className="bg-mint bg-opacity-5 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-2 text-primary mb-4">
              <Activity className="h-6 w-6" />
              <h3 className="text-xl font-montserrat font-bold uppercase">{brand.name}</h3>
            </div>
            <p className="text-text-secondary mb-6">
              {brand.description}
            </p>
            <div className="flex space-x-4">
              <SocialLink href="#" icon={Instagram} />
              <SocialLink href="#" icon={Twitter} />
              <SocialLink href="#" icon={Facebook} />
              <SocialLink href="#" icon={Youtube} />
            </div>
          </div>
          
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-lg font-montserrat font-bold uppercase mb-4">{links.quickLinks.title}</h3>
            <ul className="space-y-3">
              {links.quickLinks.items.map((item, index) => (
                <li key={index}>
                  <a href={item.href} className="text-text-secondary hover:text-primary transition-all duration-classic">
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-lg font-montserrat font-bold uppercase mb-4">{links.resources.title}</h3>
            <ul className="space-y-3">
              {links.resources.items.map((item, index) => (
                <li key={index}>
                  <a href={item.href} className="text-text-secondary hover:text-primary transition-all duration-classic">
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-lg font-montserrat font-bold uppercase mb-4">{contact.title}</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-text-secondary">
                <Mail size={16} />
                <span>{contact.email}</span>
              </li>
              <li className="flex items-center gap-2 text-text-secondary">
                <Phone size={16} />
                <span>{contact.phone}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-text-secondary/20 pt-8 mt-8 text-sm text-text-secondary">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>{legal.copyright}</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              {legal.links.map((link, index) => (
                <a key={index} href={link.href} className="hover:text-primary transition-all duration-classic">
                  {link.text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;