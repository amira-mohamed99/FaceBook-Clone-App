import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import { ToastContainer } from "react-toastify";
import App from "./App.jsx";
import UserContextProvider from "./Components/Context/UserContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HeroUIProvider>
      <UserContextProvider>
        <QueryClientProvider client={queryClient}>
          <App />
          <ToastContainer />
        </QueryClientProvider>
      </UserContextProvider>
    </HeroUIProvider>
  </StrictMode>
);
