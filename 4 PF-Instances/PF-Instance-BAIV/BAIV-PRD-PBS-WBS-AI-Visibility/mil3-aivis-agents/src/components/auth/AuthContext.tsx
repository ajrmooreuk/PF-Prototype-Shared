import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, getTenantId } from '../../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  tenantId: string | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [tenantId, setTenantId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        // Get tenant ID
        getTenantId(session.user.id).then((id) => {
          setTenantId(id);
          if (id) {
            localStorage.setItem('tenant_id', id);
          }
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          const id = await getTenantId(session.user.id);
          setTenantId(id);
          if (id) {
            localStorage.setItem('tenant_id', id);
          }
        } else {
          setTenantId(null);
          localStorage.removeItem('tenant_id');
          localStorage.removeItem('user_email');
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('tenant_id');
    localStorage.removeItem('user_email');
    setUser(null);
    setSession(null);
    setTenantId(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        tenantId,
        loading,
        signOut: handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
