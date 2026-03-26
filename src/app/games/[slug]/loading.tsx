export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="h-5 w-48 bg-slate-800 rounded animate-pulse mb-6" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 aspect-video bg-slate-800 rounded-xl animate-pulse" />
        <div className="space-y-4">
          <div className="h-8 bg-slate-800 rounded animate-pulse" />
          <div className="h-20 bg-slate-800 rounded animate-pulse" />
          <div className="h-32 bg-slate-800 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
