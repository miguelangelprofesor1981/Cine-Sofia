
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ClapperboardSearch from './components/ClapperboardSearch';
import AnalysisResult from './components/AnalysisResult';
import { analyzeMovie, analyzeMovieFromImage } from './services/geminiService';
import { PhilosophicalAnalysis, AppState } from './types';
import { AlertCircle, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [analysisData, setAnalysisData] = useState<PhilosophicalAnalysis | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleSearch = async (term: string) => {
    setAppState(AppState.ANALYZING);
    setErrorMsg('');
    setAnalysisData(null);

    try {
      const data = await analyzeMovie(term);
      setAnalysisData(data);
      setAppState(AppState.SUCCESS);
    } catch (err) {
      console.error(err);
      setErrorMsg("Lo siento, hubo un error al analizar la película. Por favor intenta nuevamente.");
      setAppState(AppState.ERROR);
    }
  };

  const handleImageSearch = async (imageBase64: string) => {
    setAppState(AppState.ANALYZING);
    setErrorMsg('');
    setAnalysisData(null);

    try {
      const data = await analyzeMovieFromImage(imageBase64);
      setAnalysisData(data);
      setAppState(AppState.SUCCESS);
    } catch (err) {
      console.error(err);
      setErrorMsg("Lo siento, no pudimos identificar o analizar la imagen de la película. Asegúrate de que sea clara.");
      setAppState(AppState.ERROR);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cinema-black text-gray-100 font-sans selection:bg-gold-500 selection:text-black">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 relative">
        {/* Spotlight Effect */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] spotlight pointer-events-none z-0"></div>

        <div className="relative z-10 flex flex-col items-center">
          
          {appState === AppState.IDLE && (
            <div className="text-center max-w-2xl mx-auto mt-6 md:mt-12 mb-8 animate-fade-in px-2">
              <h2 className="text-2xl md:text-4xl font-serif text-gold-100 mb-4">
                Descubre la filosofía detrás del cine
              </h2>
              <p className="text-gray-400 text-base md:text-lg">
                Introduce el nombre de una película o sube una captura de pantalla para que nuestra IA desvele sus secretos filosóficos.
              </p>
            </div>
          )}

          <ClapperboardSearch 
            onSearch={handleSearch} 
            onImageSearch={handleImageSearch}
            isLoading={appState === AppState.ANALYZING} 
          />

          {appState === AppState.ANALYZING && (
            <div className="mt-12 text-center animate-pulse px-4">
               <Sparkles className="w-12 h-12 text-gold-400 mx-auto mb-4 animate-spin-slow" />
               <p className="text-gold-200 font-cinema text-xl tracking-widest">ANALIZANDO METRAJE...</p>
               <p className="text-gray-500 text-sm mt-2">Consultando a los grandes pensadores (y a Google Search)</p>
            </div>
          )}

          {appState === AppState.ERROR && (
            <div className="mt-8 bg-red-900/20 border border-red-800 p-6 rounded-lg flex items-center space-x-4 text-red-200 max-w-xl mx-4">
              <AlertCircle className="w-8 h-8 flex-shrink-0" />
              <p>{errorMsg}</p>
            </div>
          )}

          {appState === AppState.SUCCESS && analysisData && (
            <AnalysisResult data={analysisData} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
