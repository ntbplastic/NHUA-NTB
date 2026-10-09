export default function Loading() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-12 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1920px] mx-auto animate-pulse">
        {/* Header Skeleton */}
        <div className="h-10 w-48 bg-slate-200 rounded mb-4"></div>
        <div className="h-4 w-96 bg-slate-200 rounded mb-12"></div>
        
        {/* Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-[16px] md:rounded-[18px] border border-slate-200 overflow-hidden h-[340px] flex flex-col">
              <div className="h-[180px] bg-slate-100 border-b border-slate-50 w-full"></div>
              <div className="p-4 flex flex-col flex-1">
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-3"></div>
                <div className="h-3 bg-slate-200 rounded w-1/2 mb-auto"></div>
                <div className="flex gap-2 mt-4">
                  <div className="h-9 bg-slate-100 rounded-full flex-1"></div>
                  <div className="h-9 bg-slate-200 rounded-full flex-1"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
