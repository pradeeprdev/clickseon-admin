"use client";
import { useState } from 'react';

const geocode = async (city: string) => {
  const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`);
  if (!res.ok) throw new Error('Geocoding failed');
  const data = await res.json();
  return data.results?.[0] || null;
};

const getWeather = async (lat: number, lon: number) => {
  const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`);
  if (!res.ok) throw new Error('Weather fetch failed');
  const data = await res.json();
  return data.current_weather;
};

export default function WeatherCard({ defaultCity = 'New Delhi' }: { defaultCity?: string }){
  const [city, setCity] = useState(defaultCity);
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const load = async (c: string) => {
    setError(null);
    setLoading(true);
    try {
      const geo = await geocode(c);
      if (!geo) throw new Error('Location not found');
      const w = await getWeather(geo.latitude, geo.longitude);
      setWeather({ temp: w.temperature, wind: w.windspeed, code: w.weathercode, name: geo.name });
    } catch (err: any) {
      setError(err?.message || 'Failed to load weather');
      setWeather(null);
    } finally { setLoading(false); }
  };

  return (
    <div className="mt-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
      <h3 className="text-lg font-semibold">Weather</h3>
      <p className="text-sm text-slate-500">Quick weather for planning</p>

      <div className="mt-4 flex gap-2">
        <input value={city} onChange={(e) => setCity(e.target.value)} className="flex-1 p-2 border rounded bg-transparent" />
        <button onClick={() => load(city)} disabled={loading} className="px-3 py-2 bg-indigo-600 text-white rounded">{loading ? 'Loading' : 'Load'}</button>
      </div>

      <div className="mt-4">
        {error && <div className="text-rose-600">{error}</div>}
        {weather && (
          <div className="flex items-center gap-4 mt-2">
            <div>
              <div className="text-2xl font-bold">{Math.round(weather.temp)}°C</div>
              <div className="text-sm text-slate-500">{weather.name}</div>
            </div>
            <div className="text-sm text-slate-600">Wind: {weather.wind} km/h</div>
          </div>
        )}
      </div>
    </div>
  );
}
