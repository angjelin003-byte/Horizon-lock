/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { RepoFileExplorer } from './components/RepoFileExplorer';
import { CameraSimulator } from './components/CameraSimulator';
import { AICameraConfigurator } from './components/AICameraConfigurator';
import { ReadmeView } from './components/ReadmeView';
import { IssuesView } from './components/IssuesView';
import { ExportView } from './components/ExportView';
import { INITIAL_FILES, INITIAL_COMMITS, INITIAL_ISSUES } from './data/repoData';
import { Smartphone, Sparkles, ShieldCheck, Download, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('simulator'); // Default to simulator as it's the core interactive S26 feature requested
  const [starCount, setStarCount] = useState(1248);
  const [isStarred, setIsStarred] = useState(false);
  const [downloadModal, setDownloadModal] = useState(false);

  const handleStar = () => {
    if (isStarred) {
      setStarCount(c => c - 1);
      setIsStarred(false);
    } else {
      setStarCount(c => c + 1);
      setIsStarred(true);
    }
  };

  const handleDownloadApk = () => {
    setDownloadModal(true);
    setTimeout(() => setDownloadModal(false), 3500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      {/* GitHub Repo Header */}
      <Header 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        starCount={starCount}
        onStar={handleStar}
        isStarred={isStarred}
        onDownloadApk={handleDownloadApk}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'code' && (
          <RepoFileExplorer 
            files={INITIAL_FILES} 
            commits={INITIAL_COMMITS}
            onDownloadZip={handleDownloadApk}
          />
        )}

        {activeTab === 'simulator' && (
          <CameraSimulator />
        )}

        {activeTab === 'ai-configurator' && (
          <AICameraConfigurator />
        )}

        {activeTab === 'readme' && (
          <ReadmeView onDownloadZip={handleDownloadApk} />
        )}

        {(activeTab === 'issues' || activeTab === 'pulls') && (
          <IssuesView issues={INITIAL_ISSUES} />
        )}

        {activeTab === 'export' && (
          <ExportView onDownloadZip={handleDownloadApk} />
        )}
      </main>

      {/* APK / Repo Download Toast Modal */}
      {downloadModal && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-emerald-500/50 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
          <div className="bg-emerald-500/20 p-2 rounded-xl border border-emerald-500/30">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <div className="font-bold text-sm">S26_HorizonLock_v2.6.apk</div>
            <div className="text-xs text-slate-400">Download started successfully (Universal ARM64)</div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-blue-400" />
            <span>Samsung Galaxy S26 Ultra Camera SDK &bull; Open Source GitHub Project</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="hover:text-white cursor-pointer">Terms</span>
            <span className="hover:text-white cursor-pointer">Privacy</span>
            <span className="hover:text-white cursor-pointer">Security</span>
            <span className="hover:text-white cursor-pointer">API Docs</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
