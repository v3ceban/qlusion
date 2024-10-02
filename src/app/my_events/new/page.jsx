import React from "react";
import EventForm from "@/components/EventCRUD/EventForm";
import { userSignedIn } from "@/lib/actions";
import { redirect } from "next/navigation";

const NewClub = async () => {
  const { user } = await userSignedIn(["admin", "clubAdmin"]);

  if (!user) {
    redirect("/");
  }

  return <EventForm event={null} />;
};

export default NewClub;
