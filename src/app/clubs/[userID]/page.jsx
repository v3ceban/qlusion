import React from "react";
import PropTypes from "prop-types";
import HomePage from "@/components/HomePage";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function Home({ params }) {
  const userID = params?.userID;
  const data = [];

  const session = await auth();
  const user = await prisma.user.findUnique({
    where: {
      id: userID,
    },
    include: {
      adminEvents: {
        include: {
          adminUsers: true,
        },
      },
    },
  });

  if (session) {
    user.adminEvents.map((event) => {
      data.push(event);
    });
  }

  return <HomePage data={data} />;
}

Home.propTypes = {
  params: PropTypes.object,
};
