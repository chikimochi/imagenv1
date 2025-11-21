import React from 'react';
import { Wand2 } from 'lucide-react';
import { AspectRatio } from '../types';

interface InputFormProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  aspectRatio: AspectRatio;
  setAspectRatio: (ratio: AspectRatio) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({
  prompt,
  setPrompt,
  aspectRatio,
  setAspectRatio,
  onSubmit,
  isLoading
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full">
      <div className="space-y-2">
        <label htmlFor="prompt" className="block text-sm font-medium text-slate-300 ml-1">
          Describe your imagination
        </label>
        <div className="relative group">
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A futuristic city with neon lights reflecting on wet pavement, cyberpunk style..."
            className="w-full h-32 bg-dark-800 border-2 border-dark-700 rounded-xl p-4 text-white placeholder-slate-500 focus:border-brand-500 focus:ring-0 transition-all duration-200 resize-none shadow-inner text-base leading-relaxed"
            disabled={isLoading}
          />
          <div className="absolute bottom-3 right-3 text-xs text-slate-500 pointer-events-none">
            {prompt.length} chars
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300 ml-1">
            Aspect Ratio
          </label>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(AspectRatio).map(([key, value]) => (
              <button
                key={key}
                type="button"
                onClick={() => setAspectRatio(value)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 border ${
                  aspectRatio === value
                    ? 'bg-brand-500/10 border-brand-500 text-brand-500'
                    : 'bg-dark-800 border-dark-700 text-slate-400 hover:border-dark-600'
                }`}
              >
                {key} <span className="opacity-50 block mt-0.5">{value}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className={`w-full h-[58px] rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-lg ${
              isLoading || !prompt.trim()
                ? 'bg-dark-700 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-brand-600 to-blue-600 text-white hover:shadow-brand-500/25 hover:-translate-y-0.5 active:translate-y-0'
            }`}
          >
            {isLoading ? (
              'Generating...'
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                Generate Image
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default InputForm;