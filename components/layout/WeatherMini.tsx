"use client";
import { useEffect, useState } from 'react';

async function geocode(city: string) {
  const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`);
  if (!res.ok) return null;
  const data = await res.json();
  return data.results?.[0] || null;
}

async function getWeather(lat: number, lon: number) {
  const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`);
  if (!res.ok) return null;
  const data = await res.json();
  return data.current_weather;
}

export default function WeatherMini({ defaultCity = 'New Delhi' }: { defaultCity?: string }){
  const [temp, setTemp] = useState<number | null>(null);
  const [city, setCity] = useState(defaultCity);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const geo = await geocode(city);
        if (!geo) return;
        const w = await getWeather(geo.latitude, geo.longitude);
        if (!w) return;
        if (mounted) setTemp(Math.round(w.temperature));
      } catch (err) {
        // ignore
      }
    };
    load();
    return () => { mounted = false; };
  }, [city]);

  return (
    <div className="hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 bg-white/60">
      <div className="text-xs text-slate-700">{city}</div>
      <div className="text-sm font-semibold text-slate-900">{temp === null ? '—' : `${temp}°C`}</div>
    </div>
  );
}
