const { PrismaClient } = require("@prisma/client");
const { put } = require("@vercel/blob");
const fs = require("fs");
const path = require("path");

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
