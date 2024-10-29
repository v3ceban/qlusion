const { PrismaClient } = require("@prisma/client");
const { put } = require("@vercel/blob");
const fs = require("fs");
const path = require("path");
const { ICalCalendar, ICalEventRepeatingFreq } = require("ical-generator");

const prisma = new PrismaClient();

const main = async () => {
  const data = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "data.json"), "utf8"),
  );
  const categories = data
    .map((item) => item.category)
    .filter((value, index, self) => self.indexOf(value) === index);

  const newCategories = [];

  for (const category of categories) {
    const existingCategory = await prisma.clubCategory.findFirst({
      where: {
        name: category,
      },
    });

    if (existingCategory) {
      newCategories.push(existingCategory);
    } else {
      const newCategory = await prisma.clubCategory.create({
        data: {
          name: category,
        },
      });

      newCategories.push(newCategory);
    }
  }

  for (const event of data) {
    const { category, name, location, day, time, picture, admins } = event;
    const categoryId = newCategories.find((item) => item.name === category).id;
    let pictureUrl = "";
    const clubAdmins = [];

    const existingEvent = await prisma.clubEvent.findFirst({
      where: {
        name,
      },
    });

    if (existingEvent) {
      pictureUrl = existingEvent.picture;
    } else {
      if (picture) {
        try {
          const picturePath = path.resolve(__dirname, "img", picture);
          const pictureFile = fs.readFileSync(picturePath);
          const contentType = "image/*";

          const blob = await put(picture, pictureFile, {
            contentType,
            access: "public",
          });
          pictureUrl = blob.url;
        } catch (e) {
          console.error(e);
          pictureUrl = "";
        }
      }
    }

    for (const president of admins.president) {
      const user = await prisma.user.findFirst({
        where: {
          name: president.name,
          email: president.email,
        },
      });

      if (user) {
        clubAdmins.push(user);
      } else {
        const newUser = await prisma.user.create({
          data: {
            name: president.name,
            email: president.email,
            role: "clubAdmin",
          },
        });

        clubAdmins.push(newUser);
      }
    }

    for (const vicePresident of admins.vice_president) {
      const user = await prisma.user.findFirst({
        where: {
          name: vicePresident.name,
          email: vicePresident.email,
        },
      });

      if (user) {
        clubAdmins.push(user);
      } else {
        const newUser = await prisma.user.create({
          data: {
            name: vicePresident.name,
            email: vicePresident.email,
            role: "clubAdmin",
          },
        });

        clubAdmins.push(newUser);
      }
    }

    if (existingEvent) {
      await prisma.clubEvent.update({
        where: {
          id: existingEvent.id,
        },
        data: {
          location,
          day,
          time,
          picture: pictureUrl,
          categoryId,
          admins: {
            connect: clubAdmins.map((item) => ({
              id: item.id,
            })),
          },
        },
      });
    } else {
      await prisma.clubEvent.create({
        data: {
          name,
          location,
          day,
          time,
          picture: pictureUrl,
          categoryId,
          admins: {
            connect: clubAdmins.map((item) => ({
              id: item.id,
            })),
          },
        },
      });
    }
  }

  const calendar = await generateCalendar();
  const icsData = calendar.toString();

  await prisma.ics_feed.upsert({
    where: { id: "default" },
    update: { content: icsData },
    create: { id: "default", content: icsData },
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

async function generateCalendar() {
  const events = await prisma.clubEvent.findMany({
    include: { category: true },
  });

  const calendar = new ICalCalendar({
    name: "Qlusion",
    description: "Santa Clara University club events registered on Qlusion",
    timezone: "America/Los_Angeles",
    prodId: {
      company: "Qlusion",
      product: "Qlusion Calendar",
    },
  });

  events.forEach((event) => {
    const timeString = event.time.trim().toLowerCase();
    const { startTime, endTime } = convertTo24HourFormat(timeString);
    const dayMapping = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };

    if (startTime === null || endTime === null) {
      console.log(
        `Error: Invalid time format for event: ${event.name} - ID: ${event.id}`,
      );
      return;
    }

    const currentYear = new Date().getFullYear();
    const jan1st = new Date(currentYear, 0, 1);
    const firstEventOffset = (dayMapping[event.day] - jan1st.getDay() + 7) % 7;
    const start = new Date(jan1st);
    start.setDate(jan1st.getDate() + firstEventOffset);
    start.setHours(startTime.hours, startTime.minutes, 0);
    if (start < new Date()) {
      start.setDate(start.getDate() + 7);
    }
    const end = new Date(start);
    end.setHours(endTime.hours, endTime.minutes, 0);
    const repeatUntil = new Date(currentYear, 11, 31);
    calendar.createEvent({
      start,
      end,
      summary: event.name,
      location: event.location,
      description: `Category: ${event.category.name}`,
      repeating: {
        freq: ICalEventRepeatingFreq.WEEKLY,
        until: repeatUntil,
      },
    });
  });

  return calendar;
}

const convertTo24HourFormat = (time) => {
  const separator = getSeparator(time);
  const [startPart, endPart] = time
    .split(separator ? separator : " ")
    .map((part) => part.trim().toLowerCase());

  const startTime = getHoursAndMinutes(startPart, time);
  const endTime = endPart ? getHoursAndMinutes(endPart, time) : null;

  return {
    startTime,
    endTime:
      endTime ||
      (startTime && {
        hours: startTime.hours + 1,
        minutes: startTime.minutes,
      }),
  };
};

const getSeparator = (time) => {
  try {
    if (time.includes("-")) {
      return "-";
    }
    if (time.includes("–")) {
      return "–";
    }
    if (time.includes("to")) {
      return "to";
    }
  } catch (error) {
    console.error(error);
    return null;
  }
  return null;
};

const getHoursAndMinutes = (time, init) => {
  if (!/\d/.test(time)) return null;

  let [hours, minutes] = time
    .split(":")
    .map((str) => str.replace(/\D/g, ""))
    .map(Number);

  if (init.toLowerCase().includes("pm") && hours < 12) {
    hours += 12;
  } else if (init.toLowerCase().includes("am") && hours === 12) {
    hours = 0;
  }

  return {
    hours,
    minutes: minutes || 0,
  };
};
