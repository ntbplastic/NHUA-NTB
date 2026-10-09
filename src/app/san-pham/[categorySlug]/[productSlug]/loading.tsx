export default function Loading() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 animate-pulse">
        {/* Breadcrumb Skeleton */}
        <div className="h-4 w-64 bg-slate-200 rounded mb-8"></div>
        
        <div className="bg-white rounded-[16px] md:rounded-[24px] border border-[#E2E8F0] shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Visual Skeleton */}
            <div className="p-6 md:p-10 border-b lg:border-b-0 lg:border-r border-[#E2E8F0] bg-[#F2F6F7]">
              <div className="aspect-[4/3] md:aspect-square bg-slate-200 rounded mb-6 w-full"></div>
              <div className="grid grid-cols-4 gap-3">
                <div className="aspect-square bg-slate-200 rounded-lg"></div>
                <div className="aspect-square bg-slate-200 rounded-lg"></div>
                <div className="aspect-square bg-slate-200 rounded-lg"></div>
              </div>
            </div>

            {/* Details Skeleton */}
            <div className="p-6 md:p-10 flex flex-col">
              <div className="h-6 w-24 bg-slate-200 rounded mb-4"></div>
              <div className="h-8 w-3/4 bg-slate-200 rounded mb-6"></div>
              <div className="h-4 w-full bg-slate-100 rounded mb-2"></div>
              <div className="h-4 w-5/6 bg-slate-100 rounded mb-8"></div>
              
              <div className="h-48 bg-slate-100 rounded-xl mb-8 w-full border border-slate-200"></div>
              
              <div className="flex gap-2.5 mt-auto">
                <div className="h-11 bg-slate-200 rounded-full flex-1"></div>
                <div className="h-11 w-24 bg-slate-200 rounded-full"></div>
                <div className="h-11 w-12 bg-slate-200 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
