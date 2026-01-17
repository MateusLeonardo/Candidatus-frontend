"use client";
import { QueryProvider } from "./query-provider";
import { ThemeProvider } from "./theme-provider";
import { UserLoader } from "./user-loader";
import { store } from "@/store/configure-store";
import { Provider } from "react-redux";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <UserLoader>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </QueryProvider>
      </UserLoader>
      </Provider>
  );
}
