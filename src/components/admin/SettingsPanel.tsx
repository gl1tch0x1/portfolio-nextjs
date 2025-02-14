'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { toast } from 'sonner';

interface Settings {
  id: string;
  maintenance_mode: boolean;
  analytics_enabled: boolean;
  cache_duration: number;
  last_cache_clear: string;
}

export function SettingsPanel() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .single();

    if (error && error.code !== 'PGRST116') {
      toast.error('Failed to fetch settings');
      return;
    }

    setSettings(data);
    setIsLoading(false);
  };

  const updateSetting = async (key: keyof Settings, value: any) => {
    const { error } = await supabase
      .from('settings')
      .update({ [key]: value })
      .eq('id', settings?.id);

    if (error) {
      toast.error(`Failed to update ${key}`);
      return;
    }

    setSettings(prev => prev ? { ...prev, [key]: value } : null);
    toast.success(`${key.replace('_', ' ')} updated successfully`);
  };

  const clearCache = async () => {
    const { error } = await supabase
      .from('settings')
      .update({
        last_cache_clear: new Date().toISOString()
      })
      .eq('id', settings?.id);

    if (error) {
      toast.error('Failed to clear cache');
      return;
    }

    toast.success('Cache cleared successfully');
    fetchSettings();
  };

  if (isLoading) {
    return (
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-6">Settings</h2>
      
      <div className="space-y-6">
        {/* Maintenance Mode */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Maintenance Mode</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Enable to show maintenance page to visitors
            </p>
          </div>
          <button
            onClick={() => updateSetting('maintenance_mode', !settings?.maintenance_mode)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
              ${settings?.maintenance_mode ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                ${settings?.maintenance_mode ? 'translate-x-6' : 'translate-x-1'}`}
            />
          </button>
        </div>

        {/* Analytics */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Analytics</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Enable website analytics tracking
            </p>
          </div>
          <button
            onClick={() => updateSetting('analytics_enabled', !settings?.analytics_enabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
              ${settings?.analytics_enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                ${settings?.analytics_enabled ? 'translate-x-6' : 'translate-x-1'}`}
            />
          </button>
        </div>

        {/* Cache Settings */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Cache Duration (hours)</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Set the duration for cached content
            </p>
          </div>
          <select
            value={settings?.cache_duration}
            onChange={(e) => updateSetting('cache_duration', Number(e.target.value))}
            className="bg-gray-100 dark:bg-gray-700 rounded px-3 py-1"
          >
            <option value={1}>1 hour</option>
            <option value={6}>6 hours</option>
            <option value={12}>12 hours</option>
            <option value={24}>24 hours</option>
          </select>
        </div>

        {/* Cache Clear */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Clear Cache</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Last cleared: {settings?.last_cache_clear ? 
                new Date(settings.last_cache_clear).toLocaleString() : 
                'Never'}
            </p>
          </div>
          <button
            onClick={clearCache}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
          >
            Clear Cache
          </button>
        </div>
      </div>
    </section>
  );
} 