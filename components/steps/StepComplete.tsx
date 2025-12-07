import React from 'react';
import { CheckCircle, RefreshCcw } from 'lucide-react';

export const StepComplete: React.FC = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-green-50 text-center">
        <CheckCircle className="text-green-500 w-24 h-24 mb-6" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Simulation Complete!</h1>
        <p className="text-gray-600 max-w-lg mb-8">
            You have successfully configured a secure Remote Desktop connection using Cloudflare Tunnel. 
            <br/><br/>
            <strong>Summary:</strong>
            <br/>
            1. Installed Cloudflared on PC (No ports opened)
            <br/>
            2. Created a Tunnel in Zero Trust Dashboard
            <br/>
            3. Connected Laptop via WARP Client
        </p>
        <button 
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
        >
            <RefreshCcw size={18} /> Restart Simulation
        </button>
    </div>
  );
};