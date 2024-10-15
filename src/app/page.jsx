import React from "react";
import HomePage from "@/components/HomePage";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const data = await prisma.ClubEvent.findMany({
    include: {
      category: true,
      admins: true,
    },
  });

  return <HomePage data={data} />;
}
