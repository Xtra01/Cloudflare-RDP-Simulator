import React from 'react';
import { SimulationStep } from '../types';
import { StepIntro } from './steps/StepIntro';
import { StepCloudflarePortal } from './steps/StepCloudflarePortal';
import { StepPowerShell } from './steps/StepPowerShell';
import { StepCloudflareConfig } from './steps/StepCloudflareConfig';
import { StepWindowsSettings } from './steps/StepWindowsSettings';
import { StepWarpClient } from './steps/StepWarpClient';
import { StepRdpClient } from './steps/StepRdpClient';
import { StepComplete } from './steps/StepComplete';

interface SimulationViewProps {
  step: SimulationStep;
  onComplete: () => void;
}

export const SimulationView: React.FC<SimulationViewProps> = ({ step, onComplete }) => {
  return (
    <div className="flex-1 bg-gray-200 flex items-center justify-center p-4 sm:p-8 h-full overflow-hidden relative">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl h-[600px] sm:h-[700px] overflow-hidden flex flex-col relative border border-gray-300">
        {/* Fake Browser/OS Toolbar to add realism */}
        <div className="h-8 bg-gray-100 border-b border-gray-300 flex items-center px-4 gap-2">
            <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="ml-4 text-xs text-gray-500 font-medium">
               Cloudflare RDP Simulator - {step}
            </div>
        </div>

        <div className="flex-1 relative overflow-hidden bg-gray-50">
           {renderStep(step, onComplete)}
        </div>
      </div>
    </div>
  );
};

const renderStep = (step: SimulationStep, onComplete: () => void) => {
  switch (step) {
    case SimulationStep.INTRO:
      return <StepIntro onComplete={onComplete} />;
    case SimulationStep.CLOUDFLARE_CREATE_TUNNEL:
      return <StepCloudflarePortal onComplete={onComplete} />;
    case SimulationStep.PC_INSTALL_AGENT:
      return <StepPowerShell onComplete={onComplete} />;
    case SimulationStep.CLOUDFLARE_CONFIG_ROUTE:
      return <StepCloudflareConfig onComplete={onComplete} />;
    case SimulationStep.PC_ENABLE_RDP:
      return <StepWindowsSettings onComplete={onComplete} />;
    case SimulationStep.LAPTOP_INSTALL_WARP:
      return <StepWarpClient onComplete={onComplete} />;
    case SimulationStep.LAPTOP_CONNECT_RDP:
      return <StepRdpClient onComplete={onComplete} />;
    case SimulationStep.COMPLETE:
      return <StepComplete />;
    default:
      return <div>Unknown Step</div>;
  }
};