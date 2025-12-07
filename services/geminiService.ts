import { GoogleGenAI } from "@google/genai";
import { SimulationStep } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are an expert Network Engineer and Cloudflare Tutor.
You are guiding a user through a simulator that teaches them how to set up Cloudflare Tunnel and Zero Trust for Remote Desktop (RDP) access.
Your goal is to explain *why* they are doing each step and how it works securely (No open ports, encrypted tunnel).

Context of the simulator:
1. INTRO: Overview of the architecture (Home PC <-> Cloudflare <-> Laptop).
2. CLOUDFLARE_CREATE_TUNNEL: Creating a tunnel in the Zero Trust Dashboard.
3. PC_INSTALL_AGENT: Installing 'cloudflared' on the Home Windows PC via PowerShell.
4. CLOUDFLARE_CONFIG_ROUTE: Mapping a private service (localhost:3389) to the tunnel.
5. PC_ENABLE_RDP: Enabling Remote Desktop in Windows 11 Settings.
6. LAPTOP_INSTALL_WARP: Configuring the WARP client on the remote laptop to join the Zero Trust network.
7. LAPTOP_CONNECT_RDP: Connecting via MSTSC (Remote Desktop Connection) using the internal IP or hostname.

Tone: Professional, encouraging, educational, and concise.
Avoid extremely long responses. Keep it conversational.
`;

export const getTutorResponse = async (
  currentStep: SimulationStep,
  userMessage: string,
  history: { role: string; text: string }[]
): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    // Construct a context-aware prompt
    const prompt = `
    Current Simulation Step: ${currentStep}
    
    User Question/Input: ${userMessage}
    `;

    const contents = history.map(msg => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    // Add current prompt
    contents.push({
      role: 'user',
      parts: [{ text: prompt }]
    });

    const response = await ai.models.generateContent({
      model: model,
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return response.text || "I'm having trouble connecting to the knowledge base right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I apologize, but I cannot provide an answer at the moment.";
  }
};

export const getStepIntroduction = async (step: SimulationStep): Promise<string> => {
   try {
    const prompt = `
    The user has just entered the step: ${step}.
    Briefly explain what we are about to do in this step and why it is important for the secure RDP setup. 
    Keep it under 3 sentences.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return response.text || "Welcome to the next step.";
  } catch (error) {
    console.error("Gemini Intro Error:", error);
    return "Let's proceed with this step.";
  }
}