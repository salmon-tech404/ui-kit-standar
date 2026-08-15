import { apiClient } from './axiosClient';

export interface ProjectDto {
  _id: string;
  name: string;
  description?: string;
  version: string;
  schemaVersion: string;
  tokens: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export const projectApi = {
  list: async () => {
    const { data } = await apiClient.get<{ projects: ProjectDto[] }>('/projects');
    return data.projects;
  },

  getById: async (id: string) => {
    const { data } = await apiClient.get<{ project: ProjectDto }>(`/projects/${id}`);
    return data.project;
  },

  create: async (payload: { name: string; description?: string; tokens?: Record<string, any> }) => {
    const { data } = await apiClient.post<{ project: ProjectDto }>('/projects', payload);
    return data.project;
  },

  update: async (id: string, payload: { name?: string; description?: string; tokens?: Record<string, any>; version?: string }) => {
    const { data } = await apiClient.put<{ project: ProjectDto }>(`/projects/${id}`, payload);
    return data.project;
  },

  delete: async (id: string) => {
    const { data } = await apiClient.delete(`/projects/${id}`);
    return data;
  },
};
