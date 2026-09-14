import React, { useState } from 'react';
import { 
  FileCode, 
  Copy, 
  Check, 
  Download, 
  Smartphone, 
  Github, 
  Terminal, 
  FolderGit2,
  ExternalLink 
} from 'lucide-react';

export const ExportView: React.FC<{ onDownloadZip: () => void }> = ({ onDownloadZip }) => {
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  const filesToExport = [
    {
      name: '.github/workflows/build.yml',
      desc: 'GitHub Actions Workflow to build Android Debug APK automatically',
      content: `name: Build Android Debug APK

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build-apk:
    name: Build Debug APK & Run Tests
    runs-on: ubuntu-latest

    steps:
    - name: Checkout Repository
      uses: actions/checkout@v4

    - name: Set up JDK 17
      uses: actions/setup-java@v4
      with:
        distribution: 'temurin'
        java-version: '17'

    - name: Grant execute permission for Gradle wrapper
      run: chmod +x gradlew

    - name: Build Debug APK with Gradle
      run: ./gradlew assembleDebug --stacktrace

    - name: Run Unit Tests
      run: ./gradlew testDebugUnitTest

    - name: Upload Debug APK Artifact
      uses: actions/upload-artifact@v4
      with:
        name: s26-horizon-lock-debug-apk
        path: app/build/outputs/apk/debug/app-debug.apk`
    },
    {
      name: 'scripts/build_apk.sh',
      desc: 'Local Gradle build script for compiling APK',
      content: `#!/usr/bin/env bash
set -e
echo "Building Samsung Galaxy S26 Horizon Lock Camera APK..."
chmod +x gradlew
./gradlew clean assembleDebug --stacktrace
echo "APK generated at: app/build/outputs/apk/debug/app-debug.apk"`
    },
    {
      name: 'scripts/install_device.sh',
      desc: 'ADB script to install APK on your connected Android device',
      content: `#!/usr/bin/env bash
set -e
adb devices
APK_PATH="app/build/outputs/apk/debug/app-debug.apk"
if [ ! -f "$APK_PATH" ]; then
    echo "APK not found. Run scripts/build_apk.sh first."
    exit 1
fi
adb install -r "$APK_PATH"
echo "Installed successfully on Android device!"`
    }
  ];

  const handleCopy = (name: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedFile(name);
    setTimeout(() => setCopiedFile(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Mobile-Friendly Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-500/30 rounded-2xl p-6 text-white shadow-xl space-y-3">
        <div className="flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-blue-400" />
          <span className="text-xs bg-blue-500/20 text-blue-300 px-2.5 py-0.5 rounded-full font-semibold border border-blue-500/30">
            Mobile Web Quick Exporter
          </span>
        </div>
        <h2 className="text-xl font-bold">Add `build.yml` & Scripts on GitHub Mobile</h2>
        <p className="text-xs text-slate-300 leading-relaxed">
          Since you are browsing on mobile, you can easily tap <strong>"Copy"</strong> below and paste the code directly into GitHub's mobile web editor (`Add file` &rarr; `Create new file`).
        </p>
      </div>

      {/* Download Full ZIP Button */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div>
          <h3 className="font-bold text-white text-sm">Download Entire Project Archive</h3>
          <p className="text-xs text-slate-400">Includes all Android Kotlin files, Gradle configs, and workflows.</p>
        </div>
        <button
          onClick={onDownloadZip}
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl shadow transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Download Project ZIP</span>
        </button>
      </div>

      {/* Individual File Copy Cards for Mobile */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Configuration Files for Mobile Copy</h3>
        
        {filesToExport.map((file, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
            <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-mono text-xs font-bold text-blue-400">{file.name}</div>
                <div className="text-[11px] text-slate-400">{file.desc}</div>
              </div>
              <button
                onClick={() => handleCopy(file.name, file.content)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg border border-slate-700 transition-colors shrink-0"
              >
                {copiedFile === file.name ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
                <span>{copiedFile === file.name ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>
            <div className="p-4 bg-slate-950/80 overflow-x-auto max-h-48">
              <pre className="text-xs font-mono text-slate-300 leading-relaxed">
                <code>{file.content}</code>
              </pre>
            </div>
          </div>
        ))}
      </div>

      {/* Instructions for GitHub Mobile Web */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3 text-xs text-slate-300 shadow-xl">
        <h3 className="font-bold text-white text-sm flex items-center gap-2">
          <Github className="w-4 h-4 text-purple-400" />
          <span>How to add `build.yml` on GitHub Mobile Web:</span>
        </h3>
        <ol className="list-decimal list-inside space-y-1.5 text-slate-400">
          <li>Go to your GitHub repository on your phone browser.</li>
          <li>Tap <strong className="text-white">"Add file"</strong> &rarr; <strong className="text-white">"Create new file"</strong>.</li>
          <li>Type the exact file path: <code className="text-blue-300 font-mono">.github/workflows/build.yml</code></li>
          <li>Tap <strong className="text-white">"Copy Code"</strong> on the workflow box above, and paste it into the editor.</li>
          <li>Tap <strong className="text-white">"Commit changes..."</strong> at the bottom. GitHub Actions will instantly build your APK!</li>
        </ol>
      </div>
    </div>
  );
};
