import api from './api';

export const getLeads = async (page = 1, q = '') => {
  const res = await api.get('/leads', { params: { page, q } });
  // unwrap { success, data }
  return res.data.data || res.data;
};

export const deleteLead = async (id: string) => {
  const res = await api.delete(`/leads/${id}`);
  return res.data.data || res.data;
};
