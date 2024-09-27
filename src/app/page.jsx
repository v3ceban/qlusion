import React from "react";
import HomePage from "@/components/HomePage";

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

  return <HomePage data={data} />;
}
