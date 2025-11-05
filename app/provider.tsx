"use client"

import { QueryClient, QueryClientProvider, HydrationBoundary, DehydratedState } from "@tanstack/react-query";
import { useState } from "react";


export function Provider({
    children,
    dehydratedState,
  }: {
    children: React.ReactNode;
    dehydratedState?: DehydratedState | null | undefined;
  }) {
    const [queryClient] = useState(() => new QueryClient());
  
    return (
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={dehydratedState}>
          {children}
        </HydrationBoundary>
      </QueryClientProvider>
    );
}
  