/**
 * Supabase Client Configuration
 * Handles authentication and session management
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://okwwcwaqscklcwnydfgk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rd3djd2Fxc2NrbGN3bnlkZmdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwNzAzNDksImV4cCI6MjA3NjY0NjM0OX0.WdX9QGEoxnb4B-TtdRMjWaEcVH7wlp_9yYW8YF0ccLE';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

/**
 * Get current user session
 */
export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) {
    console.error('Error getting session:', error);
    return null;
  }
  return session;
}

/**
 * Get tenant ID for current user
 */
export async function getTenantId(userId: string): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from('tenant_users')
      .select('tenant_id')
      .eq('user_id', userId)
      .single();

    if (error) {
      // Only log if it's not a "no rows" error (which is expected for new users)
      if (error.code !== 'PGRST116') {
        console.error('Error fetching tenant ID:', error);
      }
      return null;
    }

    return data?.tenant_id || null;
  } catch (error) {
    console.error('Error in getTenantId:', error);
    return null;
  }
}

/**
 * Sign in with email and password
 */
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  // Get tenant ID
  if (data.user) {
    const tenantId = await getTenantId(data.user.id);
    if (tenantId) {
      localStorage.setItem('tenant_id', tenantId);
      localStorage.setItem('user_email', data.user.email || '');
    }
  }

  return data;
}

/**
 * Sign out current user
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out:', error);
  }
  localStorage.removeItem('tenant_id');
  localStorage.removeItem('user_email');
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  const tenantId = localStorage.getItem('tenant_id');
  return !!(session && tenantId);
}

/**
 * Get stored tenant ID from localStorage
 */
export function getStoredTenantId(): string | null {
  return localStorage.getItem('tenant_id');
}

/**
 * Get stored user email from localStorage
 */
export function getStoredUserEmail(): string | null {
  return localStorage.getItem('user_email');
}