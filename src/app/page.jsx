import React from "react";
import Main from "@/components/Main";
import Header from "@/components/Header";
import { AppProvider } from "@/lib/Providers";

export default async function Home() {
  const data = [];

  try {
    const res = await fetch("https://qlusion.com/data.json");
    if (res.ok) {
      data.push(...(await res.json()));
    }
  } catch (error) {
    console.error(error);
  }

  return (
    <AppProvider>
      <Header />
      <Main data={data} />
    </AppProvider>
  );
}
