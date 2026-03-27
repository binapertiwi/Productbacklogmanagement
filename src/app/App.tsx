import { Suspense } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { ThemeProvider } from "next-themes";

function PageLoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] bg-background">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-4 border-primary/20 border-t-secondary rounded-full animate-spin" />
        <span className="text-sm text-muted-foreground">Memuat halaman...</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <Suspense fallback={<PageLoadingFallback />}>
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  );
}
