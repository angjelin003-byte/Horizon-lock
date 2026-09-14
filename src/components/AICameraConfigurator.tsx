import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Copy, 
  Check, 
  Code2, 
  Cpu, 
  Bot, 
  RefreshCw, 
  Zap, 
  Lightbulb 
} from 'lucide-react';

export const AICameraConfigurator: React.FC = () => {
  const [prompt, setPrompt] = useState('Optimize 360-degree horizon lock for extreme action sports with zero motion blur at 120fps.');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ generatedCode: string; explanation: string } | null>({
    generatedCode: `// Galaxy S26 Action Sports Horizon Lock Optimized Configuration
package com.samsung.camera.horizonlock.profiles

import android.hardware.camera2.CaptureRequest
import android.hardware.camera2.CameraCharacteristics

object ActionSportsProfile {
    fun applyProfile(builder: CaptureRequest.Builder) {
        // Engage S26 Ultra NPU High-Frequency Gyro Prediction
        builder.set(CaptureRequest.CONTROL_VIDEO_STABILIZATION_MODE, 3)
        builder.set(CaptureRequest.SENSOR_EXPOSURE_TIME, 4166667L) // 1/240s shutter for motion blur elimination
        builder.set(CaptureRequest.CONTROL_AWB_MODE, CaptureRequest.CONTROL_AWB_MODE_AUTO)
    }
}`,
    explanation: "This configuration engages the Galaxy S26 NPU predictive motion model, tightening the gyro sensor fusion feedback loop to 1000Hz and enforcing a high shutter speed to eliminate motion blur during rapid 360-degree rotation."
  });
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/ai-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, stabilizationMode: '360_FULL_LOCK', angleLimit: 360, targetFps: 120 })
      });
      const data = await res.json();
      if (data.success) {
        setResult({
          generatedCode: data.generatedCode,
          explanation: data.explanation
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (result?.generatedCode) {
      navigator.clipboard.writeText(result.generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border border-purple-500/30 rounded-2xl p-6 text-white shadow-xl flex items-center justify-between gap-6 flex-wrap">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs px-2.5 py-1 rounded-full font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              Powered by Gemini 2.5 Flash
            </span>
            <span className="text-xs text-slate-400 font-mono">S26 NPU Code Generator</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight">AI Camera Configuration Studio</h2>
          <p className="text-sm text-slate-300">
            Describe your use case or camera shooting environment in natural language. Gemini will generate optimized Kotlin code and camera parameters for the Samsung Galaxy S26 Horizon Lock SDK.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Input Panel */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <form onSubmit={handleGenerate} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Bot className="w-4 h-4 text-purple-400" />
                <span>Describe Camera Scenario</span>
              </label>
              <textarea
                rows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. Configure smooth cinematic panning in low light with 4K 60fps horizon lock..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-500 resize-none"
              />
            </div>

            {/* Prompt Suggestion Pills */}
            <div className="space-y-2">
              <span className="text-[11px] text-slate-400 font-medium">Quick Prompts:</span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Mountain biking action sports',
                  'Cinematic sunset wedding panning',
                  'Low light night city drone shots',
                  'Extreme 360 roll stabilization'
                ].map((suggestion, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPrompt(suggestion)}
                    className="text-[11px] bg-slate-950 hover:bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-800 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Code via Gemini...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate S26 Config & Code</span>
                </>
              )}
            </button>
          </form>

          {result?.explanation && (
            <div className="bg-purple-950/20 border border-purple-500/20 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-purple-300">
                <Lightbulb className="w-4 h-4 text-purple-400" />
                <span>Engineering Analysis</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {result.explanation}
              </p>
            </div>
          )}
        </div>

        {/* Right Output Code Panel */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col shadow-xl">
          <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-purple-300">
              <Code2 className="w-4 h-4 text-purple-400" />
              <span>Generated_S26_HorizonLockConfig.kt</span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded border border-slate-700 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>

          <div className="p-4 bg-slate-950/80 overflow-x-auto flex-1 min-h-[400px]">
            <pre className="text-xs font-mono text-slate-200 leading-relaxed">
              <code>{result?.generatedCode || '// Click generate to create custom Kotlin configuration'}</code>
            </pre>
          </div>

          <div className="bg-slate-950 px-4 py-3 border-t border-slate-800/80 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Samsung S26 NPU Tensor Compiler &bull; Camera2 API Compliant</span>
            <span className="text-purple-400 font-mono">Kotlin 2.1 &bull; Ready to Compile</span>
          </div>
        </div>
      </div>
    </div>
  );
};
