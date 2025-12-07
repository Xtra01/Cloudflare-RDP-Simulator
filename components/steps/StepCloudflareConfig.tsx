import React, { useState } from 'react';

export const StepCloudflareConfig: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [hostname, setHostname] = useState('');
  const [serviceType, setServiceType] = useState('RDP');
  const [url, setUrl] = useState('localhost:3389');

  const isValid = hostname.length > 0;

  return (
    <div className="h-full bg-gray-50 flex flex-col font-sans">
       <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800">Configure "home-pc" Tunnel</h2>
       </div>

       <div className="p-8 max-w-3xl mx-auto w-full">
           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
               <h3 className="text-lg font-semibold mb-6">Public Hostnames</h3>
               <p className="text-sm text-gray-500 mb-6">
                   This defines how traffic from the internet enters your private network.
               </p>

               <div className="grid grid-cols-12 gap-4 mb-4">
                   <div className="col-span-4">
                       <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Subdomain</label>
                       <input 
                        type="text" 
                        placeholder="rdp-home"
                        value={hostname}
                        onChange={(e) => setHostname(e.target.value)}
                        className="w-full border border-gray-300 rounded p-2 text-sm"
                       />
                   </div>
                   <div className="col-span-4">
                       <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Domain</label>
                       <select className="w-full border border-gray-300 rounded p-2 text-sm bg-gray-50">
                           <option>example.com</option>
                           <option>mysite.net</option>
                       </select>
                   </div>
                   <div className="col-span-4">
                       <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Path (Optional)</label>
                       <input type="text" disabled className="w-full border border-gray-300 rounded p-2 text-sm bg-gray-100" />
                   </div>
               </div>

               <div className="bg-gray-50 p-4 rounded border border-gray-200 mb-6">
                   <h4 className="text-sm font-bold text-gray-700 mb-3">Service</h4>
                   <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-3">
                            <label className="block text-xs text-gray-500 mb-1">Type</label>
                            <select 
                                value={serviceType} 
                                onChange={(e) => setServiceType(e.target.value)}
                                className="w-full border border-gray-300 rounded p-2 text-sm"
                            >
                                <option value="HTTP">HTTP</option>
                                <option value="RDP">RDP</option>
                                <option value="TCP">TCP</option>
                            </select>
                        </div>
                        <div className="col-span-9">
                            <label className="block text-xs text-gray-500 mb-1">URL (Internal IP:Port)</label>
                            <input 
                                type="text" 
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                className="w-full border border-gray-300 rounded p-2 text-sm font-mono"
                            />
                        </div>
                   </div>
               </div>

               <div className="flex justify-end pt-4 border-t border-gray-100">
                   <button 
                    onClick={onComplete}
                    disabled={!isValid}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                   >
                       Save Hostname
                   </button>
               </div>
           </div>
       </div>
    </div>
  );
};