import { apiClient } from '@/shared/api';

export const exportApi = {
  previewXml: async (projectId: string): Promise<string> => {
    const { data } = await apiClient.get<{ xml: string }>(`/export/preview/${projectId}`);
    return data.xml;
  },

  downloadXmlUrl: (projectId: string): string => `/api/export/download/${projectId}`,
};
