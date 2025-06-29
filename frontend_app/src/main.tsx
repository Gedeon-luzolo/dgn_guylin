import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from "./errors/ErrorBoundary.tsx";
import { PageLoader } from "./components/loader/pageLoader.tsx";
import { Toaster } from "sonner";
import ScrollToTop from "./components/common/scrolltoTop.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      // retryDelay: 1000,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<PageLoader />}>
            <Toaster position="top-right" richColors />
            <ScrollToTop />
            <App />
          </Suspense>
        </QueryClientProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
