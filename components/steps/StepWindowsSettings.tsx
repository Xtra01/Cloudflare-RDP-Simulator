import React, { useState } from 'react';
import { Monitor, ChevronRight, ToggleLeft, ToggleRight, Check } from 'lucide-react';

export const StepWindowsSettings: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleRDP = () => {
    setIsEnabled(true);
    setTimeout(() => {
        onComplete();
    }, 1500); // Give user a moment to see the toggle state
  };

  return (
    <div className="h-full bg-[#f3f3f3] text-[#1a1a1a] font-sans flex flex-col select-none">
        {/* Settings Header */}
        <div className="p-6 pb-2">
            <h2 className="text-2xl font-semibold mb-1">Settings</h2>
            <div className="text-sm text-gray-500 flex items-center gap-1">
                System <ChevronRight size={14}/> Remote Desktop
            </div>
        </div>

        <div className="p-6 max-w-2xl">
            {/* Remote Desktop Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm mb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                         <div className="w-10 h-10 bg-blue-100 rounded text-blue-600 flex items-center justify-center">
                             <Monitor size={24} />
                         </div>
                         <div>
                             <h3 className="font-medium text-base">Remote Desktop</h3>
                             <p className="text-xs text-gray-500">Connect to and control this PC from a remote device</p>
                         </div>
                    </div>
                    <button onClick={toggleRDP} className="text-blue-600 focus:outline-none transition-colors">
                        {isEnabled ? (
                            <ToggleRight size={40} className="text-blue-600 fill-current" />
                        ) : (
                            <ToggleLeft size={40} className="text-gray-400" />
                        )}
                    </button>
                </div>
                
                {isEnabled && (
                    <div className="mt-4 pt-4 border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                            <Check size={16} /> 
                            You can now connect to this PC
                        </div>
                        <p className="text-xs text-gray-500 mt-1 pl-6">
                            PC Name: DESKTOP-HOME-01
                        </p>
                    </div>
                )}
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm opacity-60">
                <div className="flex justify-between items-center">
                    <div>
                         <h3 className="font-medium text-base text-gray-700">Require devices to use Network Level Authentication</h3>
                         <p className="text-xs text-gray-500">Recommended for security</p>
                    </div>
                    <ToggleRight size={40} className="text-blue-600/50" />
                </div>
            </div>
        </div>
    </div>
  );
};