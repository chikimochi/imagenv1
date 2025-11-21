import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import ImageDisplay from './components/ImageDisplay';
import { AspectRatio } from './types';
import { generateImageFromPrompt } from './services/geminiService';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(AspectRatio.Square);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setError(null);
    setIsLoading(true);

    // ambil API KEY dari Vite
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    try {
      if (!apiKey) {
        throw new Error("API Key is missing. Please set VITE_GEMINI_API_KEY in Vercel environment.");
      }

      // kirim API KEY ke service bila perlu
      const result = await generateImageFromPrompt(prompt, aspectRatio);
      setImageUrl(result.imageUrl);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-dark-900 text-slate-100 selection:bg-brand-500/30">
      <Header />

      <main className="flex-grow px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-2 flex flex-col gap-8 order-2 lg:order-1">
            <div>
              <h2 className="text-2xl font-bold mb-2 text-white">Create with AI</h2>
              <p className="text-slate-400 mb-6">
                Transform text into stunning visuals using the power of Gemini Flash.
              </p>

              <InputForm
                prompt={prompt}
                setPrompt={setPrompt}
                aspectRatio={aspectRatio}
                setAspectRatio={setAspectRatio}
                onSubmit={handleGenerate}
                isLoading={isLoading}
              />

              {error && (
                <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-400">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <p className="text-sm">{error}</p>
                </div>
              )}
            </div>

            <div className="bg-dark-800/50 p-6 rounded-xl border border-dark-700">
              <h3 className="text-sm font-semibold text-slate-300 mb-2">Tips for better results:</h3>
              <ul className="text-sm text-slate-400 space-y-2 list-disc list-inside">
                <li>Be specific about lighting (e.g., "cinematic lighting", "golden hour").</li>
                <li>Mention the art style (e.g., "oil painting", "cyberpunk", "photorealistic").</li>
                <li>Describe the mood (e.g., "eerie", "cheerful", "mysterious").</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3 order-1 lg:order-2 h-full">
            <div className="sticky top-24">
              <div className="aspect-square lg:aspect-auto lg:h-[600px] w-full">
                <ImageDisplay imageUrl={imageUrl} isLoading={isLoading} />
              </div>
            </div>
          </div>

        </div>
      </main>

      <footer className="py-6 text-center text-slate-600 text-sm border-t border-dark-800 mt-auto">
        <p>© {new Date().getFullYear()} GeminiGen. Built with React & Gemini API.</p>
      </footer>
    </div>
  );
};

export default App;
