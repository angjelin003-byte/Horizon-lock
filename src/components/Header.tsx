import React from 'react';
import { 
  GitFork, 
  Star, 
  Eye, 
  Code2, 
  Camera, 
  Sparkles, 
  AlertCircle, 
  GitPullRequest, 
  BookOpen, 
  Smartphone, 
  Download,
  Terminal,
  ShieldCheck
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  starCount: number;
  onStar: () => void;
  isStarred: boolean;
  onDownloadApk: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  starCount,
  onStar,
  isStarred,
  onDownloadApk,
}) => {
  return (
    <header className="bg-slate-950 text-white border-b border-slate-800 sticky top-0 z-50">
      {/* Top GitHub Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2 rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center">
            <Smartphone className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span className="hover:underline cursor-pointer text-blue-400 font-medium">samsung</span>
              <span>/</span>
              <span className="hover:underline cursor-pointer font-semibold text-white">galaxy-s26-horizon-lock</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300">Public</span>
            </div>
            <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
              Galaxy S26 Horizon Lock Camera SDK
              <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded border border-purple-500/30">v2.6.0 Ultra</span>
            </h1>
          </div>
        </div>

        {/* GitHub Actions / Star / Fork / APK Download */}
        <div className="flex items-center gap-2 flex-wrap">
          <button 
            onClick={onDownloadApk}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-md shadow transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download APK (v2.6)</span>
          </button>

          <div className="flex items-center rounded-md border border-slate-700 bg-slate-900 text-xs font-medium">
            <button className="flex items-center gap-1 px-3 py-1.5 hover:bg-slate-800 text-slate-300 border-r border-slate-700 transition-colors">
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              <span>Watch</span>
              <span className="ml-1 px-1.5 py-0.2 bg-slate-800 rounded-full text-[10px]">1.2k</span>
            </button>
            <button 
              onClick={onStar}
              className={`flex items-center gap-1 px-3 py-1.5 hover:bg-slate-800 transition-colors ${isStarred ? 'text-amber-400' : 'text-slate-300'}`}
            >
              <Star className={`w-3.5 h-3.5 ${isStarred ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`} />
              <span>{isStarred ? 'Starred' : 'Star'}</span>
              <span className="ml-1 px-1.5 py-0.2 bg-slate-800 rounded-full text-[10px]">{starCount}</span>
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 hover:bg-slate-800 text-slate-300 border-l border-slate-700 transition-colors">
              <GitFork className="w-3.5 h-3.5 text-slate-400" />
              <span>Fork</span>
              <span className="ml-1 px-1.5 py-0.2 bg-slate-800 rounded-full text-[10px]">348</span>
            </button>
          </div>
        </div>
      </div>

      {/* GitHub Repository Tabs */}
      <div className="max-w-7xl mx-auto px-4 flex overflow-x-auto no-scrollbar text-sm border-t border-slate-800/80">
        <button
          onClick={() => setActiveTab('code')}
          className={`flex items-center gap-2 py-3 px-4 border-b-2 font-medium transition-colors whitespace-nowrap ${
            activeTab === 'code' 
              ? 'border-blue-500 text-white bg-slate-900/50' 
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          <Code2 className="w-4 h-4 text-blue-400" />
          <span>Code</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300">12</span>
        </button>

        <button
          onClick={() => setActiveTab('simulator')}
          className={`flex items-center gap-2 py-3 px-4 border-b-2 font-medium transition-colors whitespace-nowrap ${
            activeTab === 'simulator' 
              ? 'border-emerald-500 text-emerald-400 bg-emerald-950/20' 
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          <Camera className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>S26 Camera Simulator</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Live</span>
        </button>

        <button
          onClick={() => setActiveTab('ai-configurator')}
          className={`flex items-center gap-2 py-3 px-4 border-b-2 font-medium transition-colors whitespace-nowrap ${
            activeTab === 'ai-configurator' 
              ? 'border-purple-500 text-purple-400 bg-purple-950/20' 
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>AI Config Studio</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">Gemini</span>
        </button>

        <button
          onClick={() => setActiveTab('readme')}
          className={`flex items-center gap-2 py-3 px-4 border-b-2 font-medium transition-colors whitespace-nowrap ${
            activeTab === 'readme' 
              ? 'border-blue-500 text-white bg-slate-900/50' 
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          <BookOpen className="w-4 h-4 text-blue-400" />
          <span>README</span>
        </button>

        <button
          onClick={() => setActiveTab('issues')}
          className={`flex items-center gap-2 py-3 px-4 border-b-2 font-medium transition-colors whitespace-nowrap ${
            activeTab === 'issues' 
              ? 'border-blue-500 text-white bg-slate-900/50' 
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          <AlertCircle className="w-4 h-4 text-slate-400" />
          <span>Issues</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300">3</span>
        </button>

        <button
          onClick={() => setActiveTab('pulls')}
          className={`flex items-center gap-2 py-3 px-4 border-b-2 font-medium transition-colors whitespace-nowrap ${
            activeTab === 'pulls' 
              ? 'border-blue-500 text-white bg-slate-900/50' 
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          <GitPullRequest className="w-4 h-4 text-slate-400" />
          <span>Pull Requests</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300">2</span>
        </button>

        <button
          onClick={() => setActiveTab('export')}
          className={`flex items-center gap-2 py-3 px-4 border-b-2 font-medium transition-colors whitespace-nowrap ${
            activeTab === 'export' 
              ? 'border-emerald-500 text-emerald-400 bg-emerald-950/20' 
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          <Smartphone className="w-4 h-4 text-emerald-400" />
          <span>Mobile / Export</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Easy</span>
        </button>
      </div>
    </header>
  );
};
