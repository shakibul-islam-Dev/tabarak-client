export function ShopSkeleton() {
  return (
    <>
      <div className="border-y border-border">
        <div className="shell flex items-center gap-2 py-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-9 w-20 animate-pulse rounded-full bg-muted"
            />
          ))}
        </div>
      </div>
      <div className="shell py-10 lg:py-14">
        <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index}>
              <div className="aspect-[4/5] animate-pulse rounded-2xl bg-muted" />
              <div className="mt-3 h-3 w-2/3 animate-pulse rounded-full bg-muted" />
              <div className="mt-2 h-3 w-1/3 animate-pulse rounded-full bg-muted" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
