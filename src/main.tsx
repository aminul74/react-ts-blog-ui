import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./contextApi/AuthContext.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { BlogProvider } from "./contextApi/BlogContext.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BlogProvider>
          <App />
        </BlogProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
