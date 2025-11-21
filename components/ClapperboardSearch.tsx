
import React, { useState, useRef } from 'react';
import { Search, Clapperboard, Loader2, Camera, ImagePlus } from 'lucide-react';

interface ClapperboardSearchProps {
  onSearch: (term: string) => void;
  onImageSearch: (imageBase64: string) => void;
  isLoading: boolean;
}

const ClapperboardSearch: React.FC<ClapperboardSearchProps> = ({ onSearch, onImageSearch, isLoading }) => {
  const [term, setTerm] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (term.trim()) {
      onSearch(term);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // Remove data URL prefix to get just the base64 data
        const base64Data = base64String.split(',')[1];
        onImageSearch(base64Data);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-8 md:my-12 px-4 md:px-0 perspective-1000">
      <div className="relative bg-gray-900 rounded-lg shadow-2xl transform transition-all duration-500 hover:scale-[1.01] md:hover:scale-[1.02] border-2 border-gray-700 group">
        
        {/* Top Hinge Part (The Clapper) */}
        <div className="absolute -top-6 md:-top-8 left-0 right-0 h-10 md:h-12 bg-white transform origin-bottom-left -rotate-2 group-hover:rotate-0 transition-transform duration-300 z-20 rounded-t-sm overflow-hidden border-b-4 border-black">
           {/* Zebra stripes */}
           <div className="w-full h-full flex">
              {[...Array(10)].map((_, i) => (
                <div key={i} className={`h-full w-full ${i % 2 === 0 ? 'bg-black' : 'bg-white'}`}></div>
              ))}
           </div>
        </div>

        {/* Main Slate Body */}
        <div className="p-5 pt-8 md:p-8 md:pt-10 bg-gray-900 text-white font-mono relative overflow-hidden">
            {/* White markers on slate */}
            <div className="absolute top-0 left-4 w-0.5 h-full bg-gray-700 opacity-30"></div>
            <div className="absolute top-0 right-4 w-0.5 h-full bg-gray-700 opacity-30"></div>
            
            <form onSubmit={handleSubmit} className="relative z-10">
              <label className="block text-gray-400 text-[10px] md:text-xs uppercase tracking-widest mb-1 ml-1">
                Título de la Película
              </label>
              <div className="flex items-center gap-2 border-b-2 border-white/50 focus-within:border-gold-500 transition-colors pb-1">
                <input 
                  type="text" 
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  placeholder="Escribe el nombre..." 
                  className="w-full bg-transparent text-xl md:text-3xl font-handwriting text-white p-2 focus:outline-none placeholder-gray-600"
                  disabled={isLoading}
                  style={{ fontSize: '16px' }} // Prevent iOS zoom
                />
                
                {/* Hidden File Input */}
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                  disabled={isLoading}
                />

                {/* Camera/Upload Button */}
                <button 
                  type="button"
                  onClick={triggerFileInput}
                  disabled={isLoading}
                  className="p-2 text-gray-400 hover:text-gold-400 transition-colors disabled:opacity-50"
                  title="Subir captura de pantalla"
                >
                  <Camera className="w-6 h-6 md:w-7 md:h-7" />
                </button>

                {/* Search Button */}
                <button 
                  type="submit"
                  disabled={isLoading || !term}
                  className="p-2 text-white hover:text-gold-400 disabled:opacity-50 transition-colors"
                >
                  {isLoading ? <Loader2 className="animate-spin w-6 h-6 md:w-8 md:h-8" /> : <Search className="w-6 h-6 md:w-8 md:h-8" />}
                </button>
              </div>
              
              <div className="mt-6 flex justify-between text-[10px] md:text-xs text-gray-400 uppercase tracking-wider">
                <div className="flex flex-col">
                  <span>Director</span>
                  <span className="text-white text-base md:text-lg">Gemini AI</span>
                </div>
                <div className="flex flex-col text-right">
                  <span>Fecha</span>
                  <span className="text-white text-base md:text-lg">2025</span>
                </div>
              </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default ClapperboardSearch;
