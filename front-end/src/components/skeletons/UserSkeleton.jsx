
export const UserSkeleton = () => {
  return (
    <div className="mt-6 border-blue-300 shadow rounded-md max-w-[45%] w-full items-center">
      <div className="animate-pulse flex space-x-2">
        <div className="rounded-full bg-slate-400 h-20 w-20"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-slate-400 rounded w-[30%]"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-400 rounded col-span-2"></div>
            </div>
            <div className="h-2 bg-slate-400 rounded"></div>
          </div>
        </div>
      </div>
      <div className="h-2 bg-slate-400 rounded mt-2 animate-pulse"></div>
    </div>
  );
};
