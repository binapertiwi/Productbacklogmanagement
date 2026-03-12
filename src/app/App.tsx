import { Suspense } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";

function PageLoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-4 border-[#1a2b4a]/20 border-t-[#f97316] rounded-full animate-spin" />
        <span className="text-sm text-gray-400">Memuat halaman...</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<PageLoadingFallback />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
