import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Landing from "@/pages/Landing";
import SearchPage from "@/pages/Search";
import Dashboard from "@/pages/Dashboard";
import ComparePage from "@/pages/Compare";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/dashboard/:username" element={<Dashboard />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/compare/:userA/:userB" element={<ComparePage />} />
        <Route
          path="*"
          element={
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-white mb-4">404</h1>
                <p className="text-slate-400 mb-6">Page not found</p>
                <a
                  href="/"
                  className="text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Go home
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </QueryClientProvider>
  );
}
