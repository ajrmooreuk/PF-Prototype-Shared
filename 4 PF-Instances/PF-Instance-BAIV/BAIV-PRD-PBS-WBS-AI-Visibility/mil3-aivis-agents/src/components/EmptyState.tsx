import { Button } from './ui/button';
import baivLogo from 'figma:asset/b801bd4090f4eac107789031e2ec2d4ee861af08.png';

export function EmptyState() {
  const handleRunFirstAudit = () => {
    console.log('Navigate to Discovery Audit');
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-6">
      <div className="text-center max-w-md">
        {/* BAIV Logo */}
        <div className="mb-8">
          <div className="w-64 h-64 mx-auto flex items-center justify-center">
            <img 
              src={baivLogo} 
              alt="BAIV Logo" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Heading */}
        <h1 
          className="text-[#000000] mb-4" 
          style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '32px' }}
        >
          Welcome to BAIV!
        </h1>

        {/* Description */}
        <p 
          className="text-gray-500 mb-8" 
          style={{ fontFamily: 'Open Sans', fontSize: '18px' }}
        >
          Run your first discovery audit to see AI visibility insights
        </p>

        {/* CTA Button */}
        <Button
          onClick={handleRunFirstAudit}
          className="bg-[#2990C6] hover:bg-[#2176AD] text-white h-12 px-8 transition-all duration-200 hover:scale-105 active:scale-95 focus:ring-2 focus:ring-[#2990C6] focus:ring-offset-2"
          style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}
        >
          Run First Audit
        </Button>
      </div>
    </div>
  );
}