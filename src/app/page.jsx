import React from "react";
import PropTypes from "prop-types";
import HomePage from "@/components/HomePage";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home({ searchParams }) {
  const data = [];
  const session = await getServerSession();
  const loginError = searchParams.error === "AccessDenied";

  if (loginError && session) {
    redirect("/");
  }

  try {
    const res = await fetch("https://qlusion.com/data.json");
    if (res.ok) {
      data.push(...(await res.json()));
    }
  } catch (error) {
    console.error(error);
  }

  return (
    <HomePage data={data} error={!session && loginError ? loginError : null} />
  );
}

Home.propTypes = {
  searchParams: PropTypes.object,
};
