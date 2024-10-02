import React from "react";
import Events from "@/components/Events";
import { userSignedIn } from "@/lib/actions";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function UserClubs() {
  const data = [];
  const { user } = await userSignedIn(["admin", "clubAdmin"]);

  if (!user) {
    redirect("/");
  }

  user.adminEvents.map((event) => {
    data.push(event);
  });

  return (
    <main>
      <section className="hero">
        <h2>
          <span>Hi, {user.name}</span>
          Please manage your events below
          <br />
          - or -
          <br />
          <Link href="/my_events/new">create new event</Link>.
        </h2>
      </section>
      <section className="content">
        <Events events={data} />
      </section>
    </main>
  );
}
