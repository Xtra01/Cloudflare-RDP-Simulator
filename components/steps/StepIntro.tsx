import React from 'react';
import { ArrowRight, Shield, Globe, Laptop, Server } from 'lucide-react';

export const StepIntro: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Secure Home RDP Access</h1>
      <p className="text-gray-600 max-w-2xl mb-12">
        We will simulate connecting your external Laptop to your powerful Home PC 
        using Cloudflare Zero Trust. This method uses a secure tunnel, meaning 
        <span className="font-bold text-red-500 mx-1">NO open ports</span> 
        are required on your home router.
      </p>

      <div className="flex items-center justify-center gap-4 mb-12 w-full max-w-4xl">
        {/* Laptop */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-2">
            <Laptop size={40} />
          </div>
          <span className="font-semibold text-gray-700">Laptop</span>
          <span className="text-xs text-gray-500">WARP Client</span>
        </div>

        {/* Connection */}
        <div className="flex-1 h-1 bg-gray-300 relative mx-4">
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                <Shield className="text-orange-500" size={24} />
             </div>
        </div>

        {/* Cloudflare */}
        <div className="flex flex-col items-center">
             <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mb-2 border-4 border-orange-500/20">
                <Globe size={48} />
             </div>
             <span className="font-semibold text-gray-700">Cloudflare</span>
             <span className="text-xs text-gray-500">Zero Trust Network</span>
        </div>

        {/* Connection */}
        <div className="flex-1 h-1 bg-gray-300 relative mx-4">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse delay-75"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse delay-150"></div>
                </div>
            </div>
        </div>

        {/* Home PC */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-gray-800 rounded-2xl flex items-center justify-center text-white mb-2 shadow-lg">
            <Server size={40} />
          </div>
          <span className="font-semibold text-gray-700">Home PC</span>
          <span className="text-xs text-gray-500">Cloudflared Agent</span>
        </div>
      </div>

      <button 
        onClick={onComplete}
        className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
      >
        Start Simulation
        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};