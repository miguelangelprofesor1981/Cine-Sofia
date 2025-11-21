
import React from 'react';
import { PhilosophicalAnalysis } from '../types';
import { BookOpen, Users, BrainCircuit, Clapperboard, Sparkles, Share2, Youtube, Film } from 'lucide-react';

interface AnalysisResultProps {
  data: PhilosophicalAnalysis;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ data }) => {
  const handleShare = async () => {
    const shareText = `🎬 Análisis Filosófico de "${data.movieTitle}"\n\n🧠 Temas: ${data.philosophicalThemes.join(', ')}\n\nDescubre más en CineSofía.`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `CineSofía - ${data.movieTitle}`,
          text: shareText,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${shareText}\n${window.location.href}`);
        alert('¡Análisis copiado al portapapeles!');
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
  };

  const getYoutubeEmbedUrl = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  const embedUrl = data.trailerUrl ? getYoutubeEmbedUrl(data.trailerUrl) : null;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-12 animate-fade-in pb-20">
      
      {/* Title Section */}
      <div className="text-center space-y-4">
        <h2 className="font-cinema text-4xl md:text-6xl text-gold-100 mb-2">{data.movieTitle}</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {data.philosophicalThemes.map((theme, idx) => (
            <span key={idx} className="px-3 py-1 border border-gold-600 text-gold-400 rounded-full text-sm uppercase tracking-widest bg-cinema-black/50">
              {theme}
            </span>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Poster, Trailer, Synopsis & Authors */}
        <div className="space-y-8">
          
          {/* Poster Section */}
          <div className="bg-cinema-black border border-gold-900 p-2 rounded-lg shadow-[0_0_15px_rgba(212,175,55,0.1)] relative overflow-hidden group">
            {data.posterUrl ? (
              <img 
                src={data.posterUrl} 
                alt={data.movieTitle}
                className="w-full h-auto rounded border border-gray-800 object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            {/* Fallback if image fails or is missing */}
            <div className={`poster-placeholder ${data.posterUrl ? 'hidden' : ''} w-full aspect-[2/3] flex flex-col items-center justify-center bg-gray-900 text-gold-600 rounded`}>
               <Film size={48} className="mb-2 opacity-50" />
               <span className="font-cinema text-sm">CineSofía</span>
               <span className="text-xs text-gray-600 mt-1">Póster no disponible</span>
            </div>
          </div>
          
          {/* Trailer Section - Enhanced Cinema Style */}
          {embedUrl && (
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-gold-900/30 via-gold-500/10 to-gold-900/30 blur rounded-lg opacity-75"></div>
              <div className="relative bg-cinema-black border-2 border-gold-800 rounded-lg overflow-hidden shadow-2xl">
                <div className="bg-black/80 px-3 py-2 flex items-center justify-between border-b border-gold-900/50">
                  <div className="flex items-center space-x-2">
                    <Youtube className="text-red-600 w-4 h-4" />
                    <span className="text-gold-400 text-xs font-serif tracking-widest uppercase">Tráiler Oficial</span>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
                  </div>
                </div>
                
                <div className="relative pb-[56.25%] h-0 bg-black">
                   <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={`${embedUrl}?rel=0&modestbranding=1&showinfo=0`}
                      title={`Tráiler de ${data.movieTitle}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                </div>
              </div>
            </div>
          )}

          <div className="bg-cinema-black border border-gold-900 p-6 rounded-lg shadow-[0_0_15px_rgba(212,175,55,0.1)]">
            <div className="flex items-center space-x-2 mb-4 border-b border-gold-900 pb-2">
              <Clapperboard className="text-gold-500" />
              <h3 className="font-serif text-2xl text-gold-200">Sinopsis</h3>
            </div>
            <p className="text-gray-300 leading-relaxed font-light">
              {data.synopsis}
            </p>
          </div>

          <div className="bg-cinema-black border border-gold-900 p-6 rounded-lg">
             <div className="flex items-center space-x-2 mb-4 border-b border-gold-900 pb-2">
              <Users className="text-gold-500" />
              <h3 className="font-serif text-2xl text-gold-200">Autores Relacionados</h3>
            </div>
            <ul className="space-y-2">
              {data.relatedAuthors.map((author, idx) => (
                <li key={idx} className="flex items-center text-gray-300">
                  <span className="w-2 h-2 bg-gold-600 rounded-full mr-3"></span>
                  {author}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Actions */}
          <div className="space-y-4">
             <button 
                onClick={handleShare}
                className="w-full flex items-center justify-center space-x-2 bg-gray-800 border border-gray-600 text-gray-300 font-bold py-3 px-4 rounded hover:border-gold-500 hover:text-gold-400 transition-all shadow-lg"
             >
                <Share2 size={20} />
                <span>Compartir</span>
             </button>
          </div>
        </div>

        {/* Center/Right Column: Deep Analysis & Activities */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Analysis */}
          <div className="bg-gray-900/80 border-t-4 border-gold-500 p-8 rounded-b-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <BrainCircuit size={100} className="text-white" />
            </div>
            <div className="flex items-center space-x-3 mb-6">
              <BookOpen className="text-gold-400 w-8 h-8" />
              <h3 className="font-serif text-3xl text-gold-100">Análisis Filosófico</h3>
            </div>
            <div className="prose prose-invert prose-gold max-w-none">
               <p className="text-gray-200 text-lg leading-relaxed whitespace-pre-line">
                 {data.analysis}
               </p>
            </div>
          </div>

          {/* Activities */}
          <div className="space-y-4">
            <h3 className="font-cinema text-2xl text-gold-300 text-center border-b border-gold-900 pb-4 mb-6">
              Actividades Sugeridas
            </h3>
            <div className="grid gap-6">
              {data.activities.map((activity, idx) => (
                <div key={idx} className="bg-black border border-gray-800 p-6 rounded hover:border-gold-700 transition-colors group">
                   <div className="flex justify-between items-start mb-2">
                      <span className="text-gold-600 font-mono text-sm">ESCENA #{idx + 1}</span>
                      <Sparkles className="w-4 h-4 text-gray-600 group-hover:text-gold-400 transition-colors" />
                   </div>
                   <h4 className="text-white font-serif text-xl mb-2">{activity.scene}</h4>
                   <p className="text-gray-400 mb-4 text-sm">{activity.description}</p>
                   <div className="bg-gray-900 p-3 rounded border-l-2 border-gold-800">
                      <p className="text-gold-200 text-xs uppercase tracking-wider mb-1">Objetivo Educativo</p>
                      <p className="text-gray-300 text-sm italic">{activity.educationalGoal}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
