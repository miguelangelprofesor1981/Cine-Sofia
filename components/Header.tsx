import React from 'react';
import { Film, Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="relative w-full py-8 overflow-hidden border-b-4 border-gold-500 bg-cinema-black">
      {/* Background texture/pattern could go here */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-500 via-transparent to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
        <div className="flex items-center space-x-3 mb-2">
          <Film className="w-8 h-8 text-gold-400" />
          <h2 className="text-gold-200 tracking-[0.3em] uppercase text-sm font-bold">Estudio de Producción</h2>
          <Film className="w-8 h-8 text-gold-400" />
        </div>
        
        <h1 className="font-cinema text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-b from-gold-100 to-gold-600 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] mb-4">
          CineSofía
        </h1>
        
        <div className="flex items-center justify-center space-x-2">
          <div className="h-[1px] w-12 bg-gold-500"></div>
          <p className="text-gold-100 font-serif italic text-lg md:text-xl">
            Donde el cine encuentra la sabiduría
          </p>
          <div className="h-[1px] w-12 bg-gold-500"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;