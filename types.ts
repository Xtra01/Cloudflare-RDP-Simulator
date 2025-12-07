export enum SimulationStep {
  INTRO = 'INTRO',
  CLOUDFLARE_CREATE_TUNNEL = 'CLOUDFLARE_CREATE_TUNNEL',
  PC_INSTALL_AGENT = 'PC_INSTALL_AGENT',
  CLOUDFLARE_CONFIG_ROUTE = 'CLOUDFLARE_CONFIG_ROUTE',
  PC_ENABLE_RDP = 'PC_ENABLE_RDP',
  LAPTOP_INSTALL_WARP = 'LAPTOP_INSTALL_WARP',
  LAPTOP_CONNECT_RDP = 'LAPTOP_CONNECT_RDP',
  COMPLETE = 'COMPLETE'
}

export interface StepData {
  id: SimulationStep;
  title: string;
  description: string;
  task: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isInitial?: boolean;
}