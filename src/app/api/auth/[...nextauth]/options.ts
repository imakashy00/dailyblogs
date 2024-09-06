import { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import { UserModel } from "@/model/userModel";
import dbConnect from "@/lib/db";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialProvider({
      // Study the CredentialProvider method
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email/Username", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        console.log("------------------ Credentials ------------------");
        console.log(credentials.email, credentials.password);
        try {
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.email },
              { username: credentials.username },
            ],
          });
          console.log(user);
          if (!user) throw new Error("Incorrect email/password or password");
          if (!user.isVerified)
            throw new Error("Please verify your email first");
          const isPasswordCorrect = await bcryptjs.compare(
            credentials.password,
            user.password
          );
          if (isPasswordCorrect) {
            return user; //{email:user.email,username:user.username}
          } else {
            throw new Error("Incorrect email/password or password");
          }
        } catch (error: any) {
          throw new Error(error); //Necessary to throw an error here
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  // if customizing 'session' return session if 'jwt' return token. Callbacks has -session,signIn,redirect,jwt
  callbacks: {
    async jwt({ token, user }) {
      // this user comes from return user on signIn in CredentialProvider
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.username = user.username;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      // token only contains userid
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.username = token.username;
      }
      return session;
    },
    // We can make token powerful by add details to it thus reducing many database query but increasing payload
  },
  theme: {
    colorScheme: "light", // "auto" | "dark" | "light"
    brandColor: "#F59E0B", // Hex color code
    logo: "", // Absolute URL to image
    buttonText: "#1F2937", // Hex color code
  },
};
