import React from "react";
import Main from "@/components/Main";
import Header from "@/components/Header";
import { AppProvider } from "@/lib/Providers";

export default function Home() {
  return (
    <AppProvider>
      <Header />
      <Main />
    </AppProvider>
  );
}
