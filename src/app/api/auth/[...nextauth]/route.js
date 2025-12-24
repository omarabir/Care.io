import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { findUserByEmail } from "@/lib/db";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Input email and password");
        }

        const user = await findUserByEmail(credentials.email);

        if (!user) {
          throw new Error("এই Email দিয়ে কোনো user নেই");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Password ভুল হয়েছে");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          nid: user.nid,
          contact: user.contact,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.nid = user.nid;
        token.contact = user.contact;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.nid = token.nid;
        session.user.contact = token.contact;
      }
      return session;
    },

    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        // Google login এর জন্য user database এ save করুন
        const existingUser = await findUserByEmail(user.email);

        if (!existingUser) {
          const { createUser } = require("@/lib/db");
          await createUser({
            email: user.email,
            name: user.name,
            nid: "", // Google login এ NID থাকবে না
            contact: "",
            password: "", // Google login এ password থাকবে না
            provider: "google",
            googleId: profile.sub,
          });
        }
      }
      return true;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
