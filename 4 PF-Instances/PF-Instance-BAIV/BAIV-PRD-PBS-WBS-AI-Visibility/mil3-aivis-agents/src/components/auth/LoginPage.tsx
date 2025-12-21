import { useState } from 'react';
import { signIn } from '../../lib/supabase';
import { Button } from '../ui/button';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import logoImage from 'figma:asset/fe32c103d57b0e71041590283a69cd593aaa06b2.png';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      onLoginSuccess();
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#e8ecf0] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <img src={logoImage} alt="Be AI Visible Logo" className="w-32 h-32" />
          </div>
          <h1 
            className="text-[#000000] mb-2" 
            style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '32px' }}
          >
            Be AI Visible
          </h1>
          <p 
            className="text-[#6b7280]" 
            style={{ fontFamily: 'Open Sans', fontSize: '16px' }}
          >
            Welcome Foot Scientific
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-[#1f2937] mb-2"
                style={{ fontFamily: 'Open Sans', fontSize: '14px', fontWeight: 600 }}
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2990C6] focus:border-transparent transition-all"
                style={{ fontFamily: 'Open Sans', fontSize: '16px' }}
                disabled={loading}
              />
            </div>

            {/* Password Field */}
            <div>
              <label 
                htmlFor="password" 
                className="block text-[#1f2937] mb-2"
                style={{ fontFamily: 'Open Sans', fontSize: '14px', fontWeight: 600 }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2990C6] focus:border-transparent transition-all"
                  style={{ fontFamily: 'Open Sans', fontSize: '16px' }}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7280] hover:text-[#1f2937] transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p 
                  className="text-red-800" 
                  style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                >
                  {error}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2990C6] hover:bg-[#2380b0] text-white py-3 rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 600 }}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p 
              className="text-[#6b7280]" 
              style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
            >
              Need help?{' '}
              <a 
                href="#" 
                className="text-[#2990C6] hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Please contact your administrator for assistance.');
                }}
              >
                Contact Support
              </a>
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p 
            className="text-[#9ca3af] text-xs" 
            style={{ fontFamily: 'Open Sans' }}
          >
            🔒 Your connection is secure and encrypted
          </p>
        </div>
      </div>
    </div>
  );
}