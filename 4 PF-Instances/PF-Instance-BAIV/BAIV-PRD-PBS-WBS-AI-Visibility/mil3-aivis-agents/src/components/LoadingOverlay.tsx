export function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md mx-4">
        <div className="flex flex-col items-center">
          {/* Spinner */}
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#2990C6] mb-6"></div>
          
          {/* Message */}
          <p 
            className="text-[#000000] text-center" 
            style={{ fontFamily: 'Open Sans', fontSize: '16px' }}
          >
            Audit in progress... This takes about 2-5 minutes
          </p>
        </div>
      </div>
    </div>
  );
}