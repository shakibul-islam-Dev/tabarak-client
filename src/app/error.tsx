"use client";

import Link from "next/link";
import { useEffect } from "react";
import { RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="shell flex min-h-[60svh] items-center justify-center py-16">
      <div className="mx-auto max-w-md text-center">
        <p className="eyebrow mb-4">Something went wrong</p>
        <h1 className="font-display text-4xl font-light tracking-[-0.02em]">
          A loose thread.
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          This page couldn&apos;t load properly. Try again — if it keeps
          happening, write to hello@tabark.com and we&apos;ll sort it out.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-2.5 sm:flex-row">
          <Button onClick={reset}>
            <RefreshCcw className="size-4" />
            Try again
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Back home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
