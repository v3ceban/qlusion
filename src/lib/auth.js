import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

const newUser = async (profile) => {
  if (profile.email.endsWith("@scu.edu")) {
    try {
      const user = await prisma.user.findUnique({
        where: { email: profile.email },
      });

      if (!user) {
        await prisma.user.create({
          data: {
            email: profile.email,
            name: profile.name,
            image: profile.image,
          },
        });
      }
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  }
  return false;
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      return profile.email.endsWith("@scu.edu");
    },
  },
  pages: {
    error: "/auth/error",
  },
});
