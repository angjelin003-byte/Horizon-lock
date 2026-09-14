import React, { useState } from 'react';
import { RepoFile, Commit } from '../types';
import { 
  Folder, 
  FileCode, 
  FileText, 
  GitBranch, 
  History, 
  Copy, 
  Check, 
  Download, 
  Terminal, 
  ChevronRight,
  ShieldAlert,
  Cpu
} from 'lucide-react';

interface RepoFileExplorerProps {
  files: RepoFile[];
  commits: Commit[];
  onSelectFile?: (file: RepoFile) => void;
  onDownloadZip: () => void;
}

export const RepoFileExplorer: React.FC<RepoFileExplorerProps> = ({
  files,
  commits,
  onDownloadZip,
}) => {
  const [selectedFile, setSelectedFile] = useState<RepoFile>(
    files[1].children?.[0].children?.[0].children?.[0].children?.[0].children?.[0].children?.[0] || files[3]
  );
  const [copied, setCopied] = useState(false);
  const [currentBranch, setCurrentBranch] = useState('main');

  const handleCopyCode = () => {
    if (selectedFile?.content) {
      navigator.clipboard.writeText(selectedFile.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Helper to recursively render file tree
  const renderTree = (items: RepoFile[], level = 0) => {
    return items.map((item, idx) => {
      const isSelected = selectedFile?.path === item.path;
      if (item.type === 'folder') {
        return (
          <div key={idx} className="space-y-1">
            <div className="flex items-center gap-2 py-1 px-2 text-slate-300 font-medium text-xs hover:bg-slate-800/60 rounded cursor-pointer select-none">
              <Folder className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="truncate">{item.name}</span>
            </div>
            {item.children && (
              <div className="pl-4 border-l border-slate-800 ml-2 space-y-1">
                {renderTree(item.children, level + 1)}
              </div>
            )}
          </div>
        );
      } else {
        const isKotlin = item.name.endsWith('.kt');
        const isXml = item.name.endsWith('.xml') || item.name.endsWith('.kts') || item.name.endsWith('.yml');
        return (
          <div
            key={idx}
            onClick={() => setSelectedFile(item)}
            className={`flex items-center justify-between py-1.5 px-2 rounded cursor-pointer text-xs transition-colors ${
              isSelected ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30' : 'text-slate-300 hover:bg-slate-800/60'
            }`}
          >
            <div className="flex items-center gap-2 truncate">
              {isKotlin ? (
                <FileCode className="w-4 h-4 text-purple-400 shrink-0" />
              ) : isXml ? (
                <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <FileCode className="w-4 h-4 text-amber-400 shrink-0" />
              )}
              <span className="truncate">{item.name}</span>
            </div>
            {item.size && <span className="text-[10px] text-slate-500 shrink-0">{item.size}</span>}
          </div>
        );
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Repo Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium text-slate-200">
            <GitBranch className="w-4 h-4 text-blue-400" />
            <span>{currentBranch}</span>
          </div>
          <span className="text-xs text-slate-400">
            <strong className="text-white">12</strong> commits &bull; <strong className="text-white">3</strong> branches &bull; <strong className="text-white">1</strong> tag
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={onDownloadZip}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition-colors"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Download ZIP</span>
          </button>
        </div>
      </div>

      {/* Latest Commit Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <img 
            src={commits[0].avatar} 
            alt={commits[0].author} 
            className="w-6 h-6 rounded-full object-cover border border-slate-700" 
          />
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-slate-200">{commits[0].author}</span>
            <span className="text-slate-400">{commits[0].message}</span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-slate-500">
          <span className="font-mono bg-slate-800 px-2 py-0.5 rounded text-slate-300 border border-slate-700">
            {commits[0].hash}
          </span>
          <span>{commits[0].timestamp}</span>
        </div>
      </div>

      {/* Main File Explorer & Code Viewer Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Tree Explorer */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-purple-400" />
              <span>Project Structure</span>
            </h3>
            <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20">Kotlin / CameraX</span>
          </div>
          <div className="space-y-1 max-h-[550px] overflow-y-auto pr-1">
            {renderTree(files)}
          </div>
        </div>

        {/* Right Code Viewer */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col shadow-xl">
          {/* File Header */}
          <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <FileCode className="w-4 h-4 text-purple-400" />
              <span>{selectedFile?.path || 'README.md'}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-slate-400">
                {selectedFile?.content?.split('\n').length || 0} lines &bull; {selectedFile?.size || '1.2 KB'}
              </span>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded border border-slate-700 transition-colors"
                title="Copy code"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Code Body */}
          <div className="p-4 bg-slate-950/80 overflow-x-auto flex-1 max-h-[540px]">
            <pre className="text-xs font-mono text-slate-200 leading-relaxed">
              <code>{selectedFile?.content || '// Select a file to view code'}</code>
            </pre>
          </div>

          {/* Footer note */}
          <div className="bg-slate-950 px-4 py-2 border-t border-slate-800/80 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Samsung S26 Ultra Horizon Lock Module &bull; Apache 2.0 License</span>
            <span className="text-emerald-400 font-mono">UTF-8 &bull; LF &bull; Kotlin 2.1</span>
          </div>
        </div>
      </div>
    </div>
  );
};
