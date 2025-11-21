import React from 'react';
import { Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-black border-t border-gold-900 py-8 mt-auto">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center space-y-4">
        <p className="text-gold-200 font-serif tracking-wide">
          Miguel Ángel Romero - Derechos reservados - Argentina 2025
        </p>
        <a 
          href="https://instagram.com/elprofedefilosofia" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-gold-500 hover:text-gold-300 transition-colors group"
        >
          <div className="p-2 border border-gold-600 rounded-full group-hover:bg-gold-900/50 transition-colors">
            <Instagram size={20} />
          </div>
          <span className="font-medium">@elprofedefilosofia</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;