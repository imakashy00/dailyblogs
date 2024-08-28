import NextAuth, { CredentialsSignin } from "next-auth";
import Resend from "next-auth/providers/resend";
import Credentials from "next-auth/providers/credentials";
import dbConnect from "./lib/db";
import { UserModel } from "./model/userModel";
import bcrypt from "bcryptjs";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password) {
          throw new CredentialsSignin("Please provide both email and password");
        }
        await dbConnect();
        const user = await UserModel.findOne({ email }).select("+password");
        if (!user) {
          throw new Error("Invalid email or password");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          throw new Error("Invalid email or password");
        }
        const authorizedUser = {
          id: user._id,
          username: user.username,
          email: user.email,
        };
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    signIn: async ({ user, account }) => {
      if (account?.provider === "google") {
        try {
          const { email, name } = user;
          await dbConnect();

          const alreadyUser = await UserModel.findOne({ email });
          if (!alreadyUser) {
            await UserModel.create({
              email: user.email,
              username: "",
              password: "",
            });
          } else {
            return true;
          }
        } catch (error: any) {
          throw new Error("Error while creating user");
          return false;
        }
      }
      if (account?.provider === "credentials") {
        return true;
      } else {
        return false;
      }
      return true;
    },
  },
});
