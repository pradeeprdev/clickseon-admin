"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '../types';
import { me } from '../services/authService';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      setLoading(false);
      setUser(null);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await me();
        setUser(res.user || null);
      } catch (err) {
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/login');
  };

  return { user, loading, logout, setUser } as const;
}
