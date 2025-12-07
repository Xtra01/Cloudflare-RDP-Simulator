import React, { useState } from 'react';
import { Wifi, Battery } from 'lucide-react';

export const StepWarpClient: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [connected, setConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const toggleConnection = () => {
    if (connected) return;
    setIsConnecting(true);
    setTimeout(() => {
        setIsConnecting(false);
        setConnected(true);
        setTimeout(onComplete, 1500);
    }, 2000);
  };

  return (
    <div className="h-full bg-[url('https://picsum.photos/1920/1080?blur=5')] bg-cover flex flex-col items-center justify-center relative">
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Fake Mac Toolbar */}
        <div className="absolute top-0 w-full h-8 bg-black/40 backdrop-blur-md flex items-center justify-between px-4 text-white text-xs font-medium z-10">
            <div className="flex gap-4">
                <span>Apple</span>
                <span>File</span>
                <span>Edit</span>
                <span>View</span>
            </div>
            <div className="flex gap-4 items-center">
                <Wifi size={14} />
                <Battery size={14} />
                <span>Tue 10:41 AM</span>
            </div>
        </div>

        {/* WARP Window */}
        <div className="bg-white/95 backdrop-blur w-80 rounded-xl shadow-2xl overflow-hidden z-20 border border-gray-200">
            <div className="h-12 border-b border-gray-200 flex items-center px-4 justify-between bg-gray-50">
                 <span className="font-bold text-gray-700">Cloudflare WARP</span>
                 <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
            
            <div className="p-8 flex flex-col items-center">
                <div 
                  onClick={toggleConnection}
                  className={`w-32 h-32 rounded-full border-4 flex items-center justify-center cursor-pointer transition-all duration-500 ${
                      connected 
                      ? 'border-orange-500 bg-orange-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                    <div className={`text-4xl font-bold transition-all duration-500 ${connected ? 'text-orange-500' : 'text-gray-400'}`}>
                        {connected ? 'ON' : 'OFF'}
                    </div>
                </div>

                <div className="mt-6 text-center h-12">
                    {isConnecting && <div className="text-gray-500 animate-pulse">Connecting to Zero Trust...</div>}
                    {connected && (
                        <div>
                            <div className="text-orange-600 font-bold">Connected</div>
                            <div className="text-xs text-gray-500">Your Internet is private</div>
                        </div>
                    )}
                    {!isConnecting && !connected && <div className="text-gray-400 text-sm">Disconnected</div>}
                </div>
            </div>

            <div className="bg-gray-100 p-3 text-xs text-center text-gray-500 border-t border-gray-200">
                Zero Trust Mode: {connected ? 'Active' : 'Inactive'}
            </div>
        </div>
        
        <div className="absolute bottom-10 bg-white px-4 py-2 rounded-full shadow-lg text-sm font-medium animate-bounce">
            Click the circle to connect WARP
        </div>
    </div>
  );
};