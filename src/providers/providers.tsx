import { UserContextProvider } from "@/context/user-context";
import { QueryProvider } from "./query-provider";
import { ThemeProvider } from "./theme-provider";
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserContextProvider>
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
    </UserContextProvider>
  );
}
