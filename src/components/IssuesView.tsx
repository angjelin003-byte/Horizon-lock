import React from 'react';
import { Issue } from '../types';
import { AlertCircle, GitPullRequest, CheckCircle2, MessageSquare, Search } from 'lucide-react';

interface IssuesViewProps {
  issues: Issue[];
}

export const IssuesView: React.FC<IssuesViewProps> = ({ issues }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4 shadow-xl text-white">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-blue-400" />
            <span>Repository Issues & Discussions</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">Report bugs or request new Samsung S26 camera features.</p>
        </div>
        <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl shadow transition-colors">
          New Issue
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center gap-4 text-xs font-semibold text-slate-300">
          <span className="text-white flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-emerald-400" />
            <span>3 Open</span>
          </span>
          <span className="text-slate-400 flex items-center gap-1.5 hover:text-white cursor-pointer">
            <CheckCircle2 className="w-4 h-4" />
            <span>14 Closed</span>
          </span>
        </div>

        <div className="divide-y divide-slate-800">
          {issues.map((issue) => (
            <div key={issue.id} className="p-4 hover:bg-slate-800/40 transition-colors flex items-start justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-white text-sm hover:text-blue-400 cursor-pointer">
                    {issue.title}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {issue.labels.map((label, idx) => (
                      <span 
                        key={idx} 
                        className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-mono"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-xs text-slate-400">
                  #{issue.id} opened {issue.created} by <strong className="text-slate-300">{issue.author}</strong>
                </div>
              </div>

              <div className="flex items-center gap-2 text-slate-400 text-xs shrink-0">
                <MessageSquare className="w-4 h-4" />
                <span>{issue.commentsCount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
