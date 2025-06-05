import React, { useState } from 'react';
import { EMAIL_PROVIDERS } from '../services/email';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export function EmailSetup() {
  const { user } = useAuth();
  const [provider, setProvider] = useState<keyof typeof EMAIL_PROVIDERS>('GMAIL');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      // Store email settings in Supabase
      const { error: dbError } = await supabase
        .from('email_settings')
        .insert({
          user_id: user.id,
          provider,
          email,
          settings: {
            host: EMAIL_PROVIDERS[provider].host,
            port: EMAIL_PROVIDERS[provider].port,
            tls: EMAIL_PROVIDERS[provider].tls,
          }
        });

      if (dbError) throw dbError;

      // Clear form
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Connect Email Account</h2>
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Provider
          </label>
          <select
            value={provider}
            onChange={(e) => setProvider(e.target.value as keyof typeof EMAIL_PROVIDERS)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {Object.keys(EMAIL_PROVIDERS).map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password or App Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            For Gmail, please use an App Password. 
            <a 
              href="https://support.google.com/accounts/answer/185833"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Learn more
            </a>
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-lg text-white font-medium ${
            loading 
              ? 'bg-blue-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Connecting...' : 'Connect Account'}
        </button>
      </form>
    </div>
  );
}