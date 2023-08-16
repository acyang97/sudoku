import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const TestProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <QueryClientProvider client={new QueryClient({})}>
      {children}
    </QueryClientProvider>
  );
};
