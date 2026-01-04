"use client";
import awsExports from "@/aws/aws-exports";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Amplify } from "aws-amplify";

Amplify.configure(awsExports);
const queryClient = new QueryClient();
export default function Provider({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
