import api from './api';

export const login = async (email: string, password: string) => {
  const res = await api.post('/auth/login', { email, password });
  // server returns { success: true, data: { user, token } }
  return res.data.data;
};

export const me = async () => {
  const res = await api.get('/auth/me');
  return res.data.data;
};
