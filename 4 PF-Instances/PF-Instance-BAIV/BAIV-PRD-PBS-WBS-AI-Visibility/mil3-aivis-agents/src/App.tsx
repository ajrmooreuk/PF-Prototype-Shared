import { useState, useEffect } from 'react';
import { Toaster } from './components/ui/sonner';
import { AppContent } from './components/AppContent';
import { LoginPage } from './components/LoginPage';
import { supabase } from './lib/supabase';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status on mount
  useEffect(() => {
    checkAuth();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event);
      
      if (event === 'SIGNED_IN') {
        setIsAuthenticated(true);
        // Store JWT token when user signs in
        if (session?.access_token) {
          localStorage.setItem('jwt_token', session.access_token);
          console.log('JWT token stored on sign in');
        }
      } else if (event === 'TOKEN_REFRESHED' && session) {
        // Automatically refresh JWT token before it expires (~50 min)
        localStorage.setItem('jwt_token', session.access_token);
        console.log('JWT token automatically refreshed');
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        // Clear all stored credentials
        localStorage.clear();
        console.log('User signed out - localStorage cleared');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const checkAuth = async () => {
    try {
      // Check localStorage for JWT token
      const jwtToken = localStorage.getItem('jwt_token');
      
      if (!jwtToken) {
        // No token, user needs to log in
        console.log('No JWT token found - user needs to log in');
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }
      
      // Verify token is still valid with Supabase
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (!session || error) {
        // Token expired or invalid, clear and redirect to login
        console.log('Session invalid or expired - clearing localStorage');
        localStorage.clear();
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }
      
      // Token is valid, ensure it's stored
      localStorage.setItem('jwt_token', session.access_token);
      console.log('Session validated successfully');
      
      // Ensure tenant_id is stored
      if (!localStorage.getItem('tenant_id')) {
        console.log('Fetching tenant_id for user');
        const { data: tenantData, error: tenantError } = await supabase
          .from('tenant_users')
          .select('tenant_id')
          .eq('user_id', session.user.id)
          .single();
        
        if (tenantData && !tenantError) {
          localStorage.setItem('tenant_id', tenantData.tenant_id);
          console.log('Tenant ID stored:', tenantData.tenant_id);
        } else {
          console.warn('Could not fetch tenant_id:', tenantError);
        }
      }
      
      // User is authenticated
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Auth check error:', error);
      localStorage.clear();
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    // Clear all localStorage (consistent with SIGNED_OUT event)
    localStorage.clear();
    
    // Sign out from Supabase (this will trigger SIGNED_OUT event)
    await supabase.auth.signOut();
    
    setIsAuthenticated(false);
  };

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#2990C6] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        <LoginPage onLoginSuccess={handleLoginSuccess} />
        <Toaster />
      </>
    );
  }

  // Show dashboard if authenticated
  return (
    <>
      <AppContent onLogout={handleLogout} />
      <Toaster />
    </>
  );
}