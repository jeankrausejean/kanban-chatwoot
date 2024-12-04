import axios from 'axios';

const CHATWOOT_API_URL = import.meta.env.VITE_CHATWOOT_API_URL;
const CHATWOOT_API_KEY = import.meta.env.VITE_CHATWOOT_API_KEY;

const api = axios.create({
  baseURL: CHATWOOT_API_URL,
  headers: {
    'api_access_token': CHATWOOT_API_KEY,
    'Content-Type': 'application/json',
  },
});

export const chatwootService = {
  async getConversations() {
    const response = await api.get('/conversations');
    return response.data;
  },

  async createConversation(data: any) {
    const response = await api.post('/conversations', data);
    return response.data;
  },

  async updateConversation(id: string, data: any) {
    const response = await api.put(`/conversations/${id}`, data);
    return response.data;
  },
};