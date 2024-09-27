import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // eslint-disable-next-line no-unused-vars
    async signIn({ user, account, profile }) {
      if (profile.email.endsWith("@scu.edu")) {
        return true;
      } else {
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
