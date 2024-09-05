import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions, Session, User } from "next-auth";
import { AxiosResponse } from "axios";
import axiosInstance from "@/tools/axios";

interface CustomUser extends User {
  jwt?: string;
  user?: any; //TODO: change it
}

interface CustomSession extends Session {
  jwt?: string;
  user?: any; //TODO: change it
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: {
          label: "Username or Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        try {
          const { data }: AxiosResponse<any> = await axiosInstance.post(
            "/auth/local",
            credentials
          );

          return data;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.jwt = (user as CustomUser).jwt;
        token.user = (user as CustomUser).user;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user && token) {
        (session as CustomSession).user = token.user as any;
        (session as CustomSession).jwt = token.jwt as any;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/sign-in",
    newUser: "/auth/sign-up",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
