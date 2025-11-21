import React from 'react';
import { Download, Image as ImageIcon, Loader2 } from 'lucide-react';

interface ImageDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, isLoading }) => {
  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `gemini-gen-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full h-full min-h-[400px] bg-dark-800 rounded-2xl border border-dark-700 flex flex-col items-center justify-center overflow-hidden relative group shadow-2xl shadow-black/50">
      {isLoading ? (
        <div className="flex flex-col items-center gap-4 animate-pulse-slow">
          <Loader2 className="w-12 h-12 text-brand-500 animate-spin" />
          <p className="text-slate-400 font-medium text-sm">Dreaming up your image...</p>
          <div className="flex gap-1 mt-2">
            <div className="w-2 h-2 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      ) : imageUrl ? (
        <div className="relative w-full h-full flex items-center justify-center bg-black/20">
          <img 
            src={imageUrl} 
            alt="Generated content" 
            className="max-w-full max-h-[600px] object-contain rounded-lg shadow-lg"
          />
          
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-end">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-white text-dark-900 px-4 py-2 rounded-lg font-semibold hover:bg-brand-50 transition-colors transform hover:scale-105 active:scale-95"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center text-slate-500">
          <ImageIcon className="w-16 h-16 mb-4 opacity-20" />
          <p className="text-sm">No image generated yet.</p>
          <p className="text-xs opacity-50 mt-1">Enter a prompt to begin.</p>
        </div>
      )}
    </div>
  );
};

export default ImageDisplay;