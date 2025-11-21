
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { PhilosophicalAnalysis } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    movieTitle: { type: Type.STRING },
    synopsis: { type: Type.STRING },
    posterUrl: { type: Type.STRING, description: "Direct URL of the official movie poster image." },
    trailerUrl: { type: Type.STRING, description: "YouTube URL of the official movie trailer found via search." },
    philosophicalThemes: { 
      type: Type.ARRAY,
      items: { type: Type.STRING }
    },
    relatedAuthors: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    },
    analysis: { type: Type.STRING, description: "Deep philosophical analysis connecting the movie to the authors." },
    activities: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          scene: { type: Type.STRING, description: "Description of the specific scene." },
          description: { type: Type.STRING, description: "The activity instructions." },
          educationalGoal: { type: Type.STRING }
        }
      }
    }
  },
  required: ["movieTitle", "synopsis", "philosophicalThemes", "relatedAuthors", "analysis", "activities"]
};

export const analyzeMovie = async (movieName: string): Promise<PhilosophicalAnalysis> => {
  if (!apiKey) throw new Error("API Key not found");

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Analiza la película "${movieName}" desde una perspectiva filosófica profunda y académica. 
      Genera una sinopsis.
      Busca y proporciona el enlace URL directo a la imagen del póster oficial de la película.
      Busca y proporciona el enlace de YouTube al tráiler oficial de la película.
      Conéctala con autores filosóficos relevantes, sugiere temas y crea actividades escolares basadas en escenas específicas.
      El tono debe ser educativo pero cautivador.`,
      config: {
        thinkingConfig: { thinkingBudget: 32768 },
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        tools: [{ googleSearch: {} }]
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as PhilosophicalAnalysis;
    }
    throw new Error("No generated text");
  } catch (error) {
    console.error("Error analyzing movie:", error);
    throw error;
  }
};

export const analyzeMovieFromImage = async (imageBase64: string): Promise<PhilosophicalAnalysis> => {
  if (!apiKey) throw new Error("API Key not found");

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: [
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: imageBase64
          }
        },
        {
          text: `Identifica qué película es la de la imagen. Si es una escena, identifica la película a la que pertenece.
          Luego, analiza la película identificada desde una perspectiva filosófica profunda y académica.
          Genera una sinopsis.
          Busca y proporciona el enlace URL directo a la imagen del póster oficial de la película.
          Busca y proporciona el enlace de YouTube al tráiler oficial de la película.
          Conéctala con autores filosóficos relevantes, sugiere temas y crea actividades escolares basadas en escenas específicas.
          El tono debe ser educativo pero cautivador.`
        }
      ],
      config: {
        thinkingConfig: { thinkingBudget: 32768 },
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        tools: [{ googleSearch: {} }]
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as PhilosophicalAnalysis;
    }
    throw new Error("No generated text from image analysis");
  } catch (error) {
    console.error("Error analyzing movie image:", error);
    throw error;
  }
};
