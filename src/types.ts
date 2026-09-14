export interface RepoFile {
  name: string;
  path: string;
  type: 'file' | 'folder';
  content?: string;
  size?: string;
  children?: RepoFile[];
}

export interface Commit {
  id: string;
  message: string;
  author: string;
  avatar: string;
  timestamp: string;
  hash: string;
}

export interface Issue {
  id: number;
  title: string;
  author: string;
  labels: string[];
  status: 'open' | 'closed';
  commentsCount: number;
  created: string;
}

export interface CameraSettings {
  mode: '360_LOCK' | 'SUPER_STEADY' | 'GIMBAL_PAN' | 'FREE';
  angleLimit: number; // 45, 90, 180, 360
  targetFps: number; // 30, 60, 120
  sensorFusion: 'hardware_gyro' | 'ai_optical' | 'hybrid';
  latencyCompMs: number;
  npuAcceleration: boolean;
  hdr10Plus: boolean;
}
