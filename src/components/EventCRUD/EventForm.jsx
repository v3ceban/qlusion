import React from "react";
import PropTypes from "prop-types";
import { userSignedIn } from "@/lib/actions";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Cancel from "./Cancel";
import Delete from "./Delete";

const fields = [
  "clubName",
  "categoryId",
  "social",
  "day",
  "time",
  "info",
  "location",
  "contact",
  "picture",
];

const getDataFromForm = (formData) => {
  const data = {};

  fields.forEach((field) => {
    const value = formData.get(field);
    if (value) {
      data[field] = value;
    }
  });

  return data;
};

const EventForm = async ({ event }) => {
  const categories = await prisma.ClubCategory.findMany();

  const saveNewEvent = async (formData) => {
    "use server";

    const { user } = await userSignedIn(["admin", "clubAdmin"]);

    if (!user) {
      return;
    }

    if (!formData) {
      return;
    }

    const data = getDataFromForm(formData);
    await prisma.ClubEvent.create({
      data: {
        ...data,
        adminUsers: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    revalidatePath("/my_events/");
    revalidatePath("/");
    redirect("/my_events/");
  };

  const updateEvent = async (formData) => {
    "use server";

    const { user } = await userSignedIn(["admin", "clubAdmin"]);

    if (!user) {
      return;
    }

    if (!formData) {
      return;
    }

    const data = getDataFromForm(formData);
    await prisma.ClubEvent.update({
      where: {
        id: event?.id,
      },
      data,
    });

    revalidatePath("/my_events/");
    revalidatePath("/");
    redirect("/my_events/");
  };

  const deleteEvent = async () => {
    "use server";

    const { user } = await userSignedIn(["admin", "clubAdmin"]);

    if (!user) {
      return;
    }

    if (!event) {
      return;
    }

    await prisma.ClubEvent.delete({
      where: {
        id: event?.id,
      },
    });

    revalidatePath("/my_events/");
    revalidatePath("/");
    redirect("/my_events/");
  };

  return (
    <main className="EventCRUD">
      <h2>{event ? "Edit" : "New"} Event</h2>
      <form className="EventCRUD" action={event ? updateEvent : saveNewEvent}>
        {fields.map((field) => {
          if (field === "categoryId") {
            return (
              <label key={field}>
                Category
                <select name="categoryId" defaultValue={event?.categoryId}>
                  <option value="" hidden>
                    Select a category
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>
            );
          } else {
            return (
              <label key={field}>
                {field === "clubName" ? "Club/Event Name" : field}:
                <input type="text" name={field} defaultValue={event?.[field]} />
              </label>
            );
          }
        })}
        <button type="submit">{event ? "Update" : "Create"}</button>
      </form>
      {event && <Delete onDelete={deleteEvent} />}
      <Cancel />
    </main>
  );
};

EventForm.propTypes = {
  event: PropTypes.object.isRequired,
};

export default EventForm;
