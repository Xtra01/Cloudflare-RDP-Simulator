import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

export const StepPowerShell: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [output, setOutput] = useState<string[]>([]);
  const [isInstalling, setIsInstalling] = useState(false);

  const command = "cloudflared.exe service install eyJhIjoiOT... (TOKEN)";

  const runInstall = () => {
    if (isInstalling) return;
    setIsInstalling(true);
    
    let logs = [
        `PS C:\\Users\\Admin> ${command}`,
        "Requesting cloudflared executable...",
        "Downloading cloudflared-windows-amd64.exe...",
        "Installing cloudflared agent service...",
        "Service 'cloudflared' installed successfully.",
        "Starting service 'cloudflared'...",
        "Cloudflared agent is running.",
        "Tunnel 'home-pc' is now CONNECTED."
    ];

    let delay = 0;
    logs.forEach((log, index) => {
        delay += 800; // Simulate time passing
        setTimeout(() => {
            setOutput(prev => [...prev, log]);
            if (index === logs.length - 1) {
                setTimeout(onComplete, 1500);
            }
        }, delay);
    });
  };

  return (
    <div className="h-full bg-[#1e1e1e] p-4 font-mono text-gray-200 flex flex-col">
       <div className="flex justify-between items-center mb-4 bg-[#2d2d2d] p-2 rounded-t-lg">
           <div className="flex gap-2 text-xs">
               <span className="text-gray-400">Administrator: Windows PowerShell</span>
           </div>
           <div className="flex gap-2">
               <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
               <div className="w-3 h-3 rounded-full bg-green-500"></div>
           </div>
       </div>

       <div className="flex-1 overflow-y-auto space-y-2 p-2 font-mono text-sm">
           <div className="text-gray-400">Windows PowerShell</div>
           <div className="text-gray-400">Copyright (C) Microsoft Corporation. All rights reserved.</div>
           <br />
           
           {output.map((line, i) => (
               <div key={i} className={line.includes(command) ? 'text-white' : 'text-gray-300'}>
                   {line}
               </div>
           ))}

           {!isInstalling && output.length === 0 && (
               <div className="mt-4">
                   <span className="text-white">PS C:\Users\Admin&gt;</span>
                   <span className="ml-2 animate-pulse">_</span>
               </div>
           )}
       </div>

       {output.length === 0 && (
           <div className="mt-4 p-4 border-t border-gray-700 flex flex-col items-center">
               <p className="text-sm text-gray-400 mb-3">
                   Cloudflare provides an installation command. Click below to run it on your Home PC.
               </p>
               <button 
                onClick={runInstall}
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded flex items-center gap-2 font-medium transition-colors"
               >
                   <Terminal size={18} />
                   Run Install Command
               </button>
           </div>
       )}
    </div>
  );
};