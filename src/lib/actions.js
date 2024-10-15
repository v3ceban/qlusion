import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// This file contains server actions. It is ment to be used on the server side only.
// It is not included in the client bundle. Never include client side code here.
// Never export functions that return sensitive data like API keys or database passwords.

// Checks if user is signed in. Redirects to home page if not.
// Accepts optional array roles. Redirects to home page if
// roles don't include user.role.
export const userSignedIn = async (roles = []) => {
  const session = await auth();
  if (session) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: session?.user?.email,
        },
        include: {
          clubs: {
            include: {
              category: true,
              admins: true,
            },
          },
        },
      });

      if (roles.length > 0 && !roles.includes(user.role)) {
        return { user: null };
      }

      return { user };
    } catch (error) {
      console.error(error);
      return { user: null };
    }
  } else {
    return { user: null };
  }
};
