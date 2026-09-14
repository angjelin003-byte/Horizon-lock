import React from 'react';
import { BookOpen, ShieldCheck, Cpu, Terminal, GitBranch, Download, Star } from 'lucide-react';

export const ReadmeView: React.FC<{ onDownloadZip: () => void }> = ({ onDownloadZip }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* README Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6 shadow-xl text-white">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-3 rounded-xl shadow-lg">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Samsung Galaxy S26 Ultra - Horizon Lock Camera SDK</h1>
            <p className="text-slate-400 text-sm mt-1">Official Reference Implementation & Configuration Repository</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          <span className="px-3 py-1 bg-slate-800 border border-slate-700 text-emerald-400 text-xs font-mono rounded-lg">Android 15 / 16</span>
          <span className="px-3 py-1 bg-slate-800 border border-slate-700 text-blue-400 text-xs font-mono rounded-lg">CameraX 1.4.1</span>
          <span className="px-3 py-1 bg-slate-800 border border-slate-700 text-purple-400 text-xs font-mono rounded-lg">Snapdragon 8 Gen 5 NPU</span>
          <span className="px-3 py-1 bg-slate-800 border border-slate-700 text-amber-400 text-xs font-mono rounded-lg">Apache 2.0 License</span>
        </div>
      </div>

      {/* README Content Body */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-8 text-slate-300 text-sm leading-relaxed shadow-xl">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2">Overview</h2>
          <p>
            The <strong className="text-white">Galaxy S26 Horizon Lock Camera</strong> repository provides developers with production-grade Kotlin code for 360-degree gimbal-like horizon leveling, sub-millisecond gyroscope sensor fusion, and NPU-accelerated video stabilization for Samsung flagship devices.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2">Key Features of Galaxy S26 Horizon Lock</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="font-semibold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                <span>360° Full Horizon Lock</span>
              </div>
              <p className="text-xs text-slate-400">Keep videos and photos perfectly level even when the phone is rotated upside down or tilted at extreme angles up to 360 degrees.</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="font-semibold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                <span>NPU-Powered Sensor Fusion</span>
              </div>
              <p className="text-xs text-slate-400">Leverages the Neural Processing Unit to eliminate motion jitter with &lt; 3ms glass-to-glass latency.</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="font-semibold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Multi-Camera Alignment</span>
              </div>
              <p className="text-xs text-slate-400">Seamless switching between Ultra-Wide (0.6x), Wide (1x), and Telephoto (3x/5x) while maintaining lock.</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="font-semibold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>Action Sports & Night Mode</span>
              </div>
              <p className="text-xs text-slate-400">Enhanced low-light multi-frame horizon correction and fast shutter motion blur elimination.</p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2">Quick Start & Configuration API</h2>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-blue-300 overflow-x-auto space-y-1">
            <div>val horizonEngine = HorizonLockEngine(context, surfaceView)</div>
            <div>horizonEngine.initialize(</div>
            <div className="pl-4">mode = HorizonLockEngine.Mode.FULL_360_LOCK,</div>
            <div className="pl-4">targetFps = 60,</div>
            <div className="pl-4">npuAcceleration = true</div>
            <div>)</div>
          </div>
        </section>

        <div className="pt-4 flex items-center justify-between border-t border-slate-800">
          <span className="text-xs text-slate-500">Maintained by Samsung Mobile Experience (MX) Division</span>
          <button
            onClick={onDownloadZip}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl shadow transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download Repository ZIP</span>
          </button>
        </div>
      </div>
    </div>
  );
};
