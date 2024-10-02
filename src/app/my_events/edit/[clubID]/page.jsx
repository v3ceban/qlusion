import React from "react";
import PropTypes from "prop-types";
import EventForm from "@/components/EventCRUD/EventForm";
import { userSignedIn } from "@/lib/actions";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

const EditClub = async ({ params }) => {
  const { user } = await userSignedIn(["admin", "clubAdmin"]);

  if (!user) {
    redirect("/");
  }

  const event = await prisma.ClubEvent.findUnique({
    where: {
      id: params.clubID,
    },
    include: {
      adminUsers: true,
    },
  });

  if (!event) {
    redirect("/");
  }

  const adminUserIds = event.adminUsers.map((adminUser) => adminUser.id);

  if (!adminUserIds.includes(user.id)) {
    redirect("/");
  }

  return <EventForm event={event} />;
};

EditClub.propTypes = {
  params: PropTypes.object.isRequired,
};

export default EditClub;
