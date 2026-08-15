import React, { useState } from 'react';
import { useProjectStore } from '../../store/useProjectStore';
import { useAuthStore } from '../../store/useAuthStore';
import { FolderPlus, Trash2, ArrowRight, X, Sparkles, Clock, CheckCircle } from 'lucide-react';

interface ProjectDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAuthModal: () => void;
}

export const ProjectDashboard: React.FC<ProjectDashboardProps> = ({ isOpen, onClose, onOpenAuthModal }) => {
  const { projects, activeProject, selectProject, createProject, deleteProject } = useProjectStore();
  const { isAuthenticated, user } = useAuthStore();

  const [isCreating, setIsCreating] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');

  if (!isOpen) return null;

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;
    await createProject(newProjectName, newProjectDesc);
    setNewProjectName('');
    setNewProjectDesc('');
    setIsCreating(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 px-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
              <FolderPlus className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                Design System Workspace
              </h2>
              <p className="text-xs text-slate-500">
                {isAuthenticated ? `Logged in as ${user?.email}` : 'Local projects mode (Sign in to sync with cloud)'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {!isAuthenticated && (
            <div className="p-4 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <div className="text-xs">
                  <div className="font-bold text-slate-900 dark:text-white">Cloud Multi-Tenant Synchronization</div>
                  <div className="text-slate-500">Sign in to save your design systems to MongoDB and generate with AI.</div>
                </div>
              </div>
              <button
                onClick={onOpenAuthModal}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm"
              >
                Sign In
              </button>
            </div>
          )}

          {/* Project Action Bar */}
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
              Your Projects ({projects.length})
            </h3>
            <button
              onClick={() => setIsCreating(true)}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm"
            >
              <FolderPlus className="w-3.5 h-3.5" />
              <span>New Design System</span>
            </button>
          </div>

          {/* Create Modal Box Inline */}
          {isCreating && (
            <form onSubmit={handleCreate} className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-3">
              <div className="text-xs font-bold text-slate-900 dark:text-white">Create New Design System</div>
              <input
                type="text"
                required
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                placeholder="Project Name (e.g. Acme SaaS V2)"
                className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:border-indigo-500 dark:text-white"
              />
              <input
                type="text"
                value={newProjectDesc}
                onChange={(e) => setNewProjectDesc(e.target.value)}
                placeholder="Description (optional)"
                className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:border-indigo-500 dark:text-white"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded-lg"
                >
                  Create Project
                </button>
              </div>
            </form>
          )}

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {projects.map((p) => {
              const isActive = activeProject?._id === p._id;
              const primaryColor = p.tokens?.foundations?.colors?.brand?.primary || '#6366F1';

              return (
                <div
                  key={p._id}
                  className={`p-4 rounded-xl border transition flex flex-col justify-between ${
                    isActive
                      ? 'bg-indigo-50/40 dark:bg-indigo-950/30 border-indigo-500 shadow-sm'
                      : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: primaryColor }} />
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white font-heading truncate max-w-[200px]">
                          {p.name}
                        </h4>
                      </div>
                      {isActive && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                          <CheckCircle className="w-3 h-3" /> Active
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                      {p.description || 'Enterprise UI Kit Standard configuration.'}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1 text-[11px]">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(p.updatedAt).toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => deleteProject(p._id)}
                        className="p-1 text-slate-400 hover:text-red-500 transition"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          selectProject(p);
                          onClose();
                        }}
                        className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1 transition shadow-sm"
                      >
                        <span>Open Studio</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
