import { ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { user, session, tenantId, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f7fa] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#2990C6] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p 
            className="text-[#6b7280]" 
            style={{ fontFamily: 'Open Sans', fontSize: '16px' }}
          >
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (!user || !session || !tenantId) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
