export default function Loading() {
  return (
    <div className="shell py-16 lg:py-24" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading…</span>
      <div className="h-3 w-24 animate-pulse rounded-full bg-muted" />
      <div className="mt-5 h-10 w-2/3 max-w-md animate-pulse rounded-2xl bg-muted sm:h-14" />
      <div className="mt-4 h-3 w-1/2 max-w-sm animate-pulse rounded-full bg-muted" />
      <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index}>
            <div className="aspect-[4/5] animate-pulse rounded-2xl bg-muted" />
            <div className="mt-3 h-3 w-2/3 animate-pulse rounded-full bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}
