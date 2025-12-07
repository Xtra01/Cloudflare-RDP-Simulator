import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export const StepCloudflarePortal: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [showModal, setShowModal] = useState(false);
  const [tunnelName, setTunnelName] = useState('');

  const handleCreate = () => {
    if (tunnelName.trim().length > 0) {
      onComplete();
    }
  };

  return (
    <div className="h-full bg-gray-50 flex flex-col font-sans">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
            <div className="text-orange-500 font-bold text-xl">Cloudflare</div>
            <div className="h-6 w-px bg-gray-300"></div>
            <div className="text-gray-600 font-medium">Zero Trust</div>
        </div>
        <div className="w-8 h-8 bg-purple-600 rounded-full text-white flex items-center justify-center text-xs">U</div>
      </div>

      {/* Sidebar + Main */}
      <div className="flex flex-1">
        <div className="w-64 bg-white border-r border-gray-200 p-4 hidden md:block">
            <div className="space-y-1">
                <div className="p-2 text-gray-600 hover:bg-gray-100 rounded cursor-pointer">Gateway</div>
                <div className="p-2 text-gray-600 hover:bg-gray-100 rounded cursor-pointer">Access</div>
                <div className="p-2 bg-orange-50 text-orange-600 font-medium rounded cursor-pointer">Networks</div>
                <div className="pl-6 py-1 text-sm text-orange-600">Tunnels</div>
            </div>
        </div>

        <div className="flex-1 p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Tunnels</h2>
                <button 
                  onClick={() => setShowModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium flex items-center gap-2 transition-colors"
                >
                    <Plus size={16} /> Create a Tunnel
                </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                <p className="text-gray-500 mb-2">You don't have any tunnels configured.</p>
                <p className="text-sm text-gray-400">Create a tunnel to connect your private infrastructure to Cloudflare.</p>
            </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10 backdrop-blur-sm">
              <div className="bg-white rounded-lg shadow-xl w-[500px] overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                      <h3 className="text-lg font-bold text-gray-800">Name your tunnel</h3>
                      <p className="text-sm text-gray-500 mt-1">Give your tunnel a name to get started.</p>
                  </div>
                  <div className="p-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tunnel name</label>
                      <input 
                        type="text" 
                        value={tunnelName}
                        onChange={(e) => setTunnelName(e.target.value)}
                        placeholder="e.g., home-pc"
                        className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                  </div>
                  <div className="p-6 bg-gray-50 flex justify-end gap-3">
                      <button onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm font-medium">Cancel</button>
                      <button 
                        onClick={handleCreate}
                        disabled={tunnelName.length === 0}
                        className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Save tunnel
                      </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};