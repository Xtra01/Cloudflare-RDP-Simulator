import React, { useState } from 'react';
import { SimulationStep } from './types';
import { SimulationView } from './components/SimulationView';
import { ChatTutor } from './components/ChatTutor';
import { ChevronRight } from 'lucide-react';

const STEPS = [
  SimulationStep.INTRO,
  SimulationStep.CLOUDFLARE_CREATE_TUNNEL,
  SimulationStep.PC_INSTALL_AGENT,
  SimulationStep.CLOUDFLARE_CONFIG_ROUTE,
  SimulationStep.PC_ENABLE_RDP,
  SimulationStep.LAPTOP_INSTALL_WARP,
  SimulationStep.LAPTOP_CONNECT_RDP,
  SimulationStep.COMPLETE
];

const STEP_LABELS: Record<SimulationStep, string> = {
    [SimulationStep.INTRO]: "Overview",
    [SimulationStep.CLOUDFLARE_CREATE_TUNNEL]: "Create Tunnel",
    [SimulationStep.PC_INSTALL_AGENT]: "Install Agent",
    [SimulationStep.CLOUDFLARE_CONFIG_ROUTE]: "Config Route",
    [SimulationStep.PC_ENABLE_RDP]: "Enable RDP",
    [SimulationStep.LAPTOP_INSTALL_WARP]: "Install WARP",
    [SimulationStep.LAPTOP_CONNECT_RDP]: "Connect",
    [SimulationStep.COMPLETE]: "Success"
};

export default function App() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = STEPS[currentStepIndex];

  const handleStepComplete = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const progress = ((currentStepIndex) / (STEPS.length - 1)) * 100;

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-100 text-gray-800">
      {/* Navbar */}
      <header className="bg-white border-b border-gray-200 h-16 flex items-center px-6 justify-between flex-shrink-0 z-30 relative">
          <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">S</div>
              <h1 className="font-bold text-xl tracking-tight text-gray-900">Cloudflare RDP <span className="text-blue-600">Sim</span></h1>
          </div>
          
          <div className="flex items-center gap-4 text-sm font-medium text-gray-500">
             <span>{STEP_LABELS[currentStep]}</span>
             <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                 <span className="text-gray-900">{currentStepIndex + 1}</span>
                 <span className="text-gray-400">/</span>
                 <span>{STEPS.length}</span>
             </div>
          </div>
      </header>

      {/* Progress Bar */}
      <div className="h-1 bg-gray-200 w-full">
          <div 
            className="h-full bg-blue-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
      </div>

      {/* Main Layout */}
      <main className="flex flex-1 relative overflow-hidden">
         {/* Simulation Area */}
         <div className="flex-1 relative pr-0 sm:pr-80 lg:pr-96 transition-all">
             <SimulationView 
                step={currentStep} 
                onComplete={handleStepComplete} 
             />
         </div>

         {/* Chat Tutor Sidebar */}
         <ChatTutor currentStep={currentStep} />
      </main>
    </div>
  );
}