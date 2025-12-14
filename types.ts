export enum AppState {
  IDLE = 'IDLE',
  SILENT_QUESTION = 'SILENT_QUESTION',
  RITUAL_SELECTION = 'RITUAL_SELECTION',
  TRANSITION = 'TRANSITION',
  REVELATION = 'REVELATION'
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  targetX?: number;
  targetY?: number;
  orbitAngle?: number;
  orbitRadius?: number;
  color: string;
}

export type Answer = string;
