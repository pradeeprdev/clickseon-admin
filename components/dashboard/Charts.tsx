"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Charts({ type }: { type: 'daily' | 'monthly' }){
  const daily = [
    { day: 'Mon', value: 12 }, { day: 'Tue', value: 8 }, { day: 'Wed', value: 15 }, { day: 'Thu', value: 10 }, { day: 'Fri', value: 18 }, { day: 'Sat', value: 6 }, { day: 'Sun', value: 4 }
  ];
  const monthly = Array.from({ length: 12 }).map((_, i) => ({ month: `M${i+1}`, value: Math.round(Math.random()*200) }));

  const data = type === 'daily' ? daily : monthly;
  const dataKey = type === 'daily' ? 'day' : 'month';

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={dataKey} />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#6366F1" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
