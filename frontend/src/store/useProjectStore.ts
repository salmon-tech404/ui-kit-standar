import { create } from 'zustand';
import { ProjectDto, projectApi } from '../api/projectApi';
import { useDesignStore } from './useDesignStore';

interface ProjectState {
  projects: ProjectDto[];
  activeProject: ProjectDto | null;
  isLoading: boolean;
  isSaving: boolean;

  fetchProjects: () => Promise<void>;
  selectProject: (project: ProjectDto) => void;
  createProject: (name: string, description?: string) => Promise<ProjectDto>;
  saveCurrentTokens: () => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  activeProject: null,
  isLoading: false,
  isSaving: false,

  fetchProjects: async () => {
    try {
      set({ isLoading: true });
      const projects = await projectApi.list();
      set({ projects, isLoading: false });

      // If no active project, select first
      if (!get().activeProject && projects.length > 0) {
        get().selectProject(projects[0]);
      }
    } catch (err) {
      set({ isLoading: false });
    }
  },

  selectProject: (project) => {
    set({ activeProject: project });
    if (project.tokens) {
      useDesignStore.getState().setTokens(project.tokens as any);
    }
  },

  createProject: async (name, description) => {
    const currentTokens = useDesignStore.getState().tokens;
    const project = await projectApi.create({ name, description, tokens: currentTokens });
    set((s) => ({ projects: [project, ...s.projects], activeProject: project }));
    return project;
  },

  saveCurrentTokens: async () => {
    const { activeProject } = get();
    if (!activeProject) return;

    try {
      set({ isSaving: true });
      const tokens = useDesignStore.getState().tokens;
      const updated = await projectApi.update(activeProject._id, { tokens });
      set({ activeProject: updated, isSaving: false });
    } catch (e) {
      set({ isSaving: false });
    }
  },

  deleteProject: async (id) => {
    await projectApi.delete(id);
    set((s) => {
      const remaining = s.projects.filter((p) => p._id !== id);
      return {
        projects: remaining,
        activeProject: s.activeProject?._id === id ? (remaining[0] || null) : s.activeProject,
      };
    });
  },
}));
