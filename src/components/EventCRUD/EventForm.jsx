import React from "react";
import PropTypes from "prop-types";
import { userSignedIn } from "@/lib/actions";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { put } from "@vercel/blob";
import { fileIsPicture } from "@/lib/utils";
import Cancel from "./Cancel";
import Delete from "./Delete";
import FileUpload from "./FileUpload";

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

const getDataFromForm = async (formData) => {
  "use server";

  const data = {};

  for (const field of fields) {
    const value = formData.get(field);
    if (value) {
      if (field === "picture" && value instanceof File) {
        if (value.size === 0 && !fileIsPicture(value)) {
          console.error("Invalid file type or size");
          return;
        }
        const contentType = value.type || "text/plain";
        const blob = await put(value.name, value, {
          contentType,
          access: "public",
        });
        data[field] = blob.url;
      } else {
        data[field] = value;
      }
    }
  }

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

    const data = await getDataFromForm(formData);
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

    const data = await getDataFromForm(formData);
    console.log(data);
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
          } else if (field === "day") {
            return (
              <label key={field}>
                Day
                <select name="day" defaultValue={event?.day}>
                  <option value="" hidden>
                    Select a day
                  </option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </label>
            );
          } else if (field === "picture") {
            return (
              <FileUpload
                key={field}
                name={field}
                accept="image/*"
                imageUrl={event?.picture}
              />
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
        <div className="buttons">
          {event && <Delete onDelete={deleteEvent} />}
          <Cancel />
          <button type="submit">{event ? "Update" : "Create"}</button>
        </div>
      </form>
    </main>
  );
};

EventForm.propTypes = {
  event: PropTypes.object.isRequired,
};

export default EventForm;
