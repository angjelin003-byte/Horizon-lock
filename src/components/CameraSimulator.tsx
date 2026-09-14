import React, { useState, useEffect } from 'react';
import { CameraSettings } from '../types';
import { 
  Camera, 
  RotateCw, 
  Sliders, 
  Activity, 
  Zap, 
  ShieldCheck, 
  Video, 
  Sparkles, 
  Smartphone, 
  Compass, 
  RefreshCw,
  Maximize2,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Unlock,
  Save
} from 'lucide-react';

export const CameraSimulator: React.FC = () => {
  const [settings, setSettings] = useState<CameraSettings>({
    mode: '360_LOCK',
    angleLimit: 360,
    targetFps: 60,
    sensorFusion: 'hardware_gyro',
    latencyCompMs: 2.4,
    npuAcceleration: true,
    hdr10Plus: true
  });

  const [phoneTilt, setPhoneTilt] = useState<number>(35); // degrees tilt
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const [snapshotTaken, setSnapshotTaken] = useState<boolean>(false);
  const [videoSavedToast, setVideoSavedToast] = useState<boolean>(false);
  const [activeLens, setActiveLens] = useState<'ultra-wide' | 'wide' | 'telephoto'>('ultra-wide');
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);
  const [showPermissionDialog, setShowPermissionDialog] = useState<boolean>(true);
  const [isHorizonLocked, setIsHorizonLocked] = useState<boolean>(true);

  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(t => t + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTakeSnapshot = () => {
    setSnapshotTaken(true);
    setTimeout(() => setSnapshotTaken(false), 2000);
  };

  const handleToggleRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
    } else {
      setIsRecording(false);
      setVideoSavedToast(true);
      setTimeout(() => setVideoSavedToast(false), 3500);
    }
  };

  const counterRotation = isHorizonLocked ? -phoneTilt : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Android Permission Request Dialog Simulation Banner */}
      {showPermissionDialog && !permissionGranted && (
        <div className="bg-amber-950/40 border border-amber-500/50 rounded-2xl p-4 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="bg-amber-500/20 p-3 rounded-xl border border-amber-500/30">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="font-bold text-sm">Android App Runtime Permission Request</div>
              <div className="text-xs text-slate-300 mt-0.5">
                "Galaxy S26 Camera" requests permission to <strong className="text-white">Access Camera</strong>, <strong className="text-white">Record Audio</strong>, and <strong className="text-white">Save Videos to Phone MediaStore</strong>.
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                setPermissionGranted(true);
                setShowPermissionDialog(false);
              }}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shadow transition-colors"
            >
              Allow & Open Camera
            </button>
            <button
              onClick={() => setShowPermissionDialog(false)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-xl transition-colors"
            >
              Deny
            </button>
          </div>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 text-white shadow-2xl flex flex-wrap items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs px-2.5 py-1 rounded-full font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Samsung Galaxy S26 Ultra Camera Studio
            </span>
            <span className="text-xs text-slate-400 font-mono">CameraX 1.4 + NPU Horizon Lock</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Installed Android App Simulator</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Test the exact build installed from the GitHub repository. Use the <strong className="text-white">Horizon Lock</strong> button to engage 360° leveling and the <strong className="text-white">Record Video</strong> button to save directly to phone storage.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl text-center">
            <div className="text-xs text-slate-400">Permission Status</div>
            <div className={`text-xs font-bold font-mono px-2 py-1 rounded mt-1 ${permissionGranted ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
              {permissionGranted ? 'GRANTED ✓' : 'PENDING ⚠️'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Virtual Phone Viewfinder Preview */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 flex flex-col items-center shadow-xl">
          <div className="w-full flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Smartphone className="w-4 h-4 text-blue-400" />
              <span>S26 Ultra Viewfinder Preview</span>
            </div>
            <div className="flex items-center gap-2">
              {(['ultra-wide', 'wide', 'telephoto'] as const).map(lens => (
                <button
                  key={lens}
                  onClick={() => setActiveLens(lens)}
                  className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors uppercase ${
                    activeLens === lens 
                      ? 'bg-blue-600 text-white shadow' 
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {lens === 'ultra-wide' ? '0.6x' : lens === 'wide' ? '1.0x' : '3x'}
                </button>
              ))}
            </div>
          </div>

          {/* Virtual Phone Mockup Frame */}
          <div className="relative w-full max-w-md aspect-[9/16] bg-slate-950 rounded-[40px] border-4 border-slate-700 shadow-2xl overflow-hidden flex flex-col justify-between p-4 select-none">
            {/* Camera Punchhole Top */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-black rounded-full z-30 border border-slate-800"></div>

            {/* Viewfinder Content Container rotated by phone tilt, counter-rotated by horizon lock */}
            <div 
              className="absolute inset-0 transition-transform duration-75 flex items-center justify-center overflow-hidden"
              style={{ transform: `rotate(${phoneTilt}deg)` }}
            >
              {permissionGranted ? (
                <div className="absolute inset-0 bg-gradient-to-b from-sky-900 via-indigo-950 to-slate-950 flex flex-col items-center justify-center p-8">
                  {/* Horizon Line Visualizer inside the tilted frame */}
                  <div 
                    className="w-full h-1 bg-red-500/80 shadow-[0_0_15px_rgba(239,68,68,0.8)] relative transition-transform duration-75"
                    style={{ transform: `rotate(${counterRotation}deg)` }}
                  >
                    <div className="absolute left-1/2 -translate-x-1/2 -top-3 bg-red-500 text-white text-[9px] px-2 py-0.2 rounded font-mono">
                      HORIZON LEVEL {Math.round(counterRotation)}°
                    </div>
                  </div>

                  {/* Simulated landscape grid */}
                  <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

                  {/* Center target crosshair */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 border border-emerald-400/50 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
                    </div>
                  </div>

                  {/* Scene elements */}
                  <div className="absolute bottom-16 text-center text-slate-400 text-xs font-mono space-y-1">
                    <div>TILT: {phoneTilt}° | LOCK: {isHorizonLocked ? 'ENABLED' : 'DISABLED'}</div>
                    <div className={isHorizonLocked ? 'text-emerald-400 font-semibold' : 'text-amber-400 font-semibold'}>
                      {isHorizonLocked ? '✓ 360° HORIZON STABILIZED' : '⚠️ UNSTABILIZED (TILTED)'}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center p-6 text-center space-y-4">
                  <AlertTriangle className="w-12 h-12 text-amber-400" />
                  <div className="text-white text-sm font-bold">Camera Permission Required</div>
                  <p className="text-xs text-slate-400">Please click "Allow & Open Camera" above to grant permissions and start the viewfinder preview.</p>
                </div>
              )}
            </div>

            {/* Viewfinder Overlay Controls (Top) */}
            <div className="relative z-20 flex items-center justify-between text-white text-xs font-mono bg-black/40 backdrop-blur px-3 py-2 rounded-xl mt-4">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                {settings.targetFps} FPS
              </span>
              <span>{activeLens.toUpperCase()}</span>
              <span>{isHorizonLocked ? '360° LOCK' : 'FREE'}</span>
            </div>

            {/* Recording timer banner if active */}
            {isRecording && (
              <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 bg-red-600/90 text-white text-xs px-3 py-1 rounded-full font-mono flex items-center gap-2 shadow-lg animate-pulse">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>REC {formatTime(recordingTime)} &bull; SAVING TO PHONE</span>
              </div>
            )}

            {/* Snapshot notification */}
            {snapshotTaken && (
              <div className="absolute inset-0 z-40 bg-white/80 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-2xl">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Snapshot Saved to Gallery</span>
                </div>
              </div>
            )}

            {/* Video saved gallery notification */}
            {videoSavedToast && (
              <div className="absolute inset-0 z-40 bg-emerald-950/90 transition-opacity duration-300 flex items-center justify-center p-6">
                <div className="bg-slate-900 text-white p-4 rounded-xl text-center space-y-2 shadow-2xl border border-emerald-500">
                  <Save className="w-8 h-8 text-emerald-400 mx-auto" />
                  <div className="font-bold text-sm">Video Saved to Phone!</div>
                  <div className="text-xs text-slate-400">Saved via MediaStore to /Movies/GalaxyS26Camera/</div>
                </div>
              </div>
            )}

            {/* Viewfinder Bottom Actions: Horizon Lock Button & Record Video Button */}
            <div className="relative z-20 flex flex-col gap-2 bg-black/70 backdrop-blur p-4 rounded-2xl mb-1">
              <div className="flex items-center justify-between gap-2">
                {/* Horizon Lock Button */}
                <button 
                  onClick={() => setIsHorizonLocked(!isHorizonLocked)}
                  className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg ${
                    isHorizonLocked 
                      ? 'bg-blue-600 hover:bg-blue-500 text-white border border-blue-400/50' 
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                  }`}
                >
                  {isHorizonLocked ? <Lock className="w-4 h-4 text-emerald-300" /> : <Unlock className="w-4 h-4 text-slate-400" />}
                  <span>{isHorizonLocked ? 'Horizon Lock: ON' : 'Horizon Lock: OFF'}</span>
                </button>

                {/* Record Video & Save Button */}
                <button 
                  onClick={handleToggleRecord}
                  disabled={!permissionGranted}
                  className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg disabled:opacity-50 ${
                    isRecording 
                      ? 'bg-red-600 text-white animate-pulse border border-white' 
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-400/50'
                  }`}
                >
                  <Video className="w-4 h-4" />
                  <span>{isRecording ? 'Stop & Save' : 'Record Video & Save'}</span>
                </button>
              </div>

              <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400">
                <button 
                  onClick={handleTakeSnapshot}
                  disabled={!permissionGranted}
                  className="hover:text-white underline disabled:opacity-50"
                >
                  Take Photo Snapshot
                </button>
                <button 
                  onClick={() => setPhoneTilt(0)}
                  className="hover:text-white underline"
                >
                  Reset Level (0°)
                </button>
              </div>
            </div>
          </div>

          {/* Virtual Phone Tilt Controller */}
          <div className="w-full bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="font-medium flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-blue-400" />
                <span>Simulate Phone Physical Tilt / Roll</span>
              </span>
              <span className="font-mono text-blue-400 font-bold">{phoneTilt}°</span>
            </div>
            <input 
              type="range" 
              min="-60" 
              max="60" 
              value={phoneTilt} 
              onChange={(e) => setPhoneTilt(Number(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>-60° (Left Tilt)</span>
              <span>0° (Level)</span>
              <span>+60° (Right Tilt)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Configuration Controls & Telemetry */}
        <div className="lg:col-span-5 space-y-6">
          {/* Horizon Lock Mode Panel */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2 border-b border-slate-800 pb-3">
              <Sliders className="w-4 h-4 text-blue-400" />
              <span>S26 Stabilization Profiles</span>
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {[
                { id: '360_LOCK', name: '360° Full Lock', desc: 'Complete rotation compensation' },
                { id: 'SUPER_STEADY+', name: 'Super Steady+', desc: 'Action sports & running' },
                { id: 'GIMBAL_PAN', name: 'Gimbal Pan', desc: 'Smooth cinematic motion' },
                { id: 'FREE', name: 'Unstabilized', desc: 'Raw gyroscope feed' }
              ].map(m => (
                <button
                  key={m.id}
                  onClick={() => setSettings({ ...settings, mode: m.id as any })}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    settings.mode === m.id 
                      ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg' 
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="font-semibold text-xs text-white">{m.name}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{m.desc}</div>
                </button>
              ))}
            </div>

            {/* Angle Threshold Slider */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Angle Compensation Range</span>
                <span className="font-mono text-emerald-400">{settings.angleLimit}°</span>
              </div>
              <select 
                value={settings.angleLimit}
                onChange={(e) => setSettings({ ...settings, angleLimit: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              >
                <option value={45}>±45° (Standard OIS)</option>
                <option value={90}>±90° (Wide Angle Stabilization)</option>
                <option value={180}>±180° (Half Roll Lock)</option>
                <option value={360}>360° Full Horizon Lock (S26 Ultra Exclusive)</option>
              </select>
            </div>

            {/* Target FPS Selector */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Target Framerate</span>
                <span className="font-mono text-purple-400">{settings.targetFps} FPS</span>
              </div>
              <div className="flex gap-2">
                {[30, 60, 120].map(fps => (
                  <button
                    key={fps}
                    onClick={() => setSettings({ ...settings, targetFps: fps })}
                    className={`flex-1 py-2 rounded-xl text-xs font-mono font-semibold transition-colors ${
                      settings.targetFps === fps 
                        ? 'bg-purple-600 text-white shadow' 
                        : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {fps} FPS
                  </button>
                ))}
              </div>
            </div>

            {/* Toggle Switches */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs text-slate-300 font-medium flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>S26 NPU Hardware Acceleration</span>
                </span>
                <input 
                  type="checkbox" 
                  checked={settings.npuAcceleration}
                  onChange={(e) => setSettings({ ...settings, npuAcceleration: e.target.checked })}
                  className="w-4 h-4 accent-blue-500 rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs text-slate-300 font-medium flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>HDR10+ Dynamic Color Correction</span>
                </span>
                <input 
                  type="checkbox" 
                  checked={settings.hdr10Plus}
                  onChange={(e) => setSettings({ ...settings, hdr10Plus: e.target.checked })}
                  className="w-4 h-4 accent-blue-500 rounded cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* Telemetry & Diagnostics Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2 border-b border-slate-800 pb-3">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Real-Time Sensor Telemetry</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400">Gyroscope Sampling Rate</span>
                <span className="font-mono text-white font-semibold">1,000 Hz</span>
              </div>
              <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400">Roll Correction Vector</span>
                <span className="font-mono text-emerald-400 font-semibold">{counterRotation.toFixed(2)}°</span>
              </div>
              <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400">MediaStore Save Target</span>
                <span className="font-mono text-blue-400 font-semibold">/Movies/GalaxyS26Camera/</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
