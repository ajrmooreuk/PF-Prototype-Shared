import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Authenticate with Supabase
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (authError) {
        // Only log non-credential errors to avoid console spam for wrong passwords
        if (authError.message !== 'Invalid login credentials') {
          console.error('Authentication error:', authError);
        }
        setError('Invalid email or password');
        setIsLoading(false);
        return;
      }
      
      if (!data.session || !data.user) {
        setError('Login failed. No session created.');
        setIsLoading(false);
        return;
      }
      
      console.log('User authenticated:', data.user.email);
      
      // Store JWT token
      localStorage.setItem('jwt_token', data.session.access_token);
      localStorage.setItem('user_email', data.user.email || '');
      console.log('JWT token stored');
      
      // Fetch user's tenant_id from tenant_users table
      const { data: tenantData, error: tenantError } = await supabase
        .from('tenant_users')
        .select('tenant_id')
        .eq('user_id', data.user.id)
        .single();
      
      if (tenantError) {
        console.error('Error fetching tenant_id:', tenantError);
        setError('Could not fetch account details. Please contact support.');
        setIsLoading(false);
        return;
      }
      
      if (tenantData && tenantData.tenant_id) {
        localStorage.setItem('tenant_id', tenantData.tenant_id);
        console.log('Tenant ID stored:', tenantData.tenant_id);
      } else {
        console.error('No tenant_id found for user');
        setError('No account found. Please contact support.');
        setIsLoading(false);
        return;
      }
      
      console.log('Login successful - redirecting to dashboard');
      
      // Trigger login success callback
      onLoginSuccess();

    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2990C6] to-[#1a6b94] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Branding */}
        <div className="text-center mb-8">
          <div className="inline-block bg-white rounded-2xl p-6 shadow-lg mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#2990C6] rounded-xl flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <h1 className="text-2xl tracking-tight text-[#000000]">BAIV</h1>
                <p className="text-xs text-gray-600">AI Visibility Platform</p>
              </div>
            </div>
          </div>
          <h2 className="text-white text-xl">Welcome Back</h2>
          <p className="text-blue-100 mt-2">Sign in to access your dashboard</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Error Alert */}
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="h-12"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="h-12"
              />
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-[#2990C6] hover:bg-[#1a6b94]"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Log In'}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Need help? Contact your administrator
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}