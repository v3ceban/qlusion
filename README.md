# Qlusion

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Install Node.js and npm:

To run this project you need to have Node.js and npm installed on your machine.
You can download Node.js from [here](https://nodejs.org/en/download/).
Node.js comes bundled with npm.

### Clone the repository:

```bash
git clone https://github.com/v3ceban/qlusion.git
```

or use [GitHub Desktop](https://desktop.github.com/download/) app.

or download the repository as a zip file and extract it.

### Get Environment Variables:

Get `.env` file from project google drive and put it in the root of the project (next to `package.json`).

#### IMPORTANT

**The file contains sensitive information!**
**Do not** share it with anyone.
**Do not** rename the file.
**Do not** commit the file to the repository.
**Do not** move the file from the root of the project.

If any of the above happens, **contact maintainer immediately**. Get ready to be punished.

### Install dependencies:

```bash
npm install
```

### Generate Prisma Client:

```bash
npx prisma generate
```

### Run the development server:

```bash
npm run dev
```

### (Optional) Run Prisma studio server to visualy work with the database:

```bash
npx prisma studio
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.jsx`. The page auto-updates as you edit the file.

UI components are located in `src/components` directory.

Project uses SCSS for styling, you can find global styles in `src/scss` directory.

Helper functions are located in `src/lib` directory.

## Database operations

### To update local schema with the current database state run:

```bash
npx prisma db pull
```

### To update the database with the current schema run:

```bash
npx prisma db push
```

### To force reset and update the database with the current schema run:

```bash
npx prisma db push --force-reset
```

### To generate a migration run:

```bash
npx prisma migrate dev --name <migration-name>
```

### To apply the migration run:

```bash
npx prisma migrate deploy
```

### To revert the migration run:

```bash
npx prisma migrate reset
```

### To generate Prisma Client run:

```bash
npx prisma generate
```

### To run Prisma Studio run:

```bash
npx prisma studio
```

### To run a seed script run:

```bash
npx prisma db seed
```

#### Before running the seed script make sure that you have:

1. A `seed.js` file in `prisma` directory.
2. A `data.json` file in `prisma` directory that contains the seed data (check project google drive for the file).
3. An `img` directory in `prisma` directory that contains images for the seed data (check project google drive for the file).

## Learn More

To learn more about the technology used in this project, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [React Docs](https://react.dev/) - React documentation with examples and refferences.
- [Prisma Documentation](https://www.prisma.io/docs/orm) - learn about Prisma ORM.
- [FontAwesome Icons](https://docs.fontawesome.com/web/use-with/react) - learn how to use Font Awesome Icons in a React application.
