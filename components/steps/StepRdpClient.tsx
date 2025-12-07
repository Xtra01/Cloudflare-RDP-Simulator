import React, { useState } from 'react';
import { Monitor, Lock } from 'lucide-react';

export const StepRdpClient: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [address, setAddress] = useState('');
  const [connecting, setConnecting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleConnect = () => {
    setConnecting(true);
    setTimeout(() => {
        setSuccess(true);
        onComplete();
    }, 2000);
  };

  if (success) {
      return (
          <div className="h-full bg-blue-600 flex items-center justify-center flex-col text-white">
              <div className="animate-spin w-12 h-12 border-4 border-white border-t-transparent rounded-full mb-4"></div>
              <h2 className="text-xl font-semibold">Configuring remote session...</h2>
              <p className="text-blue-200 mt-2">Welcome to DESKTOP-HOME-01</p>
          </div>
      )
  }

  return (
    <div className="h-full bg-[#0078D7]/10 flex items-center justify-center p-4">
        <div className="bg-white w-[400px] shadow-xl border border-gray-300 rounded-lg overflow-hidden font-sans text-sm">
            {/* Title Bar */}
            <div className="bg-white p-3 flex items-center gap-2 border-b border-gray-200">
                <div className="w-5 h-5 bg-blue-600 rounded text-white flex items-center justify-center">
                    <Monitor size={12} />
                </div>
                <span>Remote Desktop Connection</span>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="mb-6">
                    <p className="mb-4 text-gray-700">Computer:</p>
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <input 
                                type="text" 
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="rdp-home.example.com"
                                className="w-full border border-gray-300 p-2 pr-8 focus:border-blue-500 focus:outline-none"
                            />
                            <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                <Lock size={14} className="text-green-600" />
                            </div>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        Example: rdp-home.example.com (Your Cloudflare Tunnel URL)
                    </p>
                </div>

                {/* Accordion mockup */}
                <div className="border-t border-gray-200 pt-4 text-gray-500 flex items-center gap-1 cursor-pointer hover:text-blue-600">
                    <span>Show Options</span>
                    <div className="rotate-90 text-xs">›</div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-[#F0F0F0] p-4 flex justify-end gap-2 border-t border-gray-200">
                <button className="px-6 py-1.5 border border-gray-300 bg-white hover:bg-gray-50 rounded shadow-sm text-gray-700">
                    Help
                </button>
                <button 
                    onClick={handleConnect}
                    disabled={address.length < 5 || connecting}
                    className="px-6 py-1.5 border border-[#0078D7] bg-[#0078D7] hover:bg-[#0063b1] rounded shadow-sm text-white disabled:opacity-50"
                >
                    {connecting ? 'Connecting...' : 'Connect'}
                </button>
            </div>
        </div>
    </div>
  );
};