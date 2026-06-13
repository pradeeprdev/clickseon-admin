export interface User {
  _id: string;
  name: string;
  email: string;
  role?: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user: User;
}

export interface StatsResponse {
  totalLeads: number;
  todayLeads: number;
  totalChats: number;
  latestLeads: any[];
}

export interface Lead {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  service?: string;
  message?: string;
  createdAt: string;
}
