import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Profile Card Skeleton */}
      <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-6">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <Skeleton className="h-24 w-24 rounded-full bg-slate-800" />
          <div className="flex-1 space-y-3 w-full">
            <Skeleton className="h-7 w-48 bg-slate-800" />
            <Skeleton className="h-4 w-32 bg-slate-800" />
            <Skeleton className="h-4 w-full max-w-md bg-slate-800" />
            <div className="flex gap-4 pt-2">
              <Skeleton className="h-4 w-20 bg-slate-800" />
              <Skeleton className="h-4 w-20 bg-slate-800" />
              <Skeleton className="h-4 w-20 bg-slate-800" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-4"
          >
            <Skeleton className="h-4 w-20 bg-slate-800 mb-2" />
            <Skeleton className="h-8 w-16 bg-slate-800" />
          </div>
        ))}
      </div>

      {/* Charts and Repos Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-6">
          <Skeleton className="h-6 w-40 bg-slate-800 mb-4" />
          <Skeleton className="h-64 w-full bg-slate-800 rounded-xl" />
        </div>
        <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-6">
          <Skeleton className="h-6 w-40 bg-slate-800 mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full bg-slate-800 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
