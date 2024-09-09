import axiosInstance from "@/tools/axios";
import { AxiosResponse } from "axios";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        identifier: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        rememberMe: { label: "Remember Me", type: "checkbox" },
      },
      authorize: async (credentials, req) => {
        try {
          const { data }: AxiosResponse<any> = await axiosInstance.post(
            "/auth/local",
            {
              identifier: credentials?.identifier,
              password: credentials?.password,
            }
          );

          const userInfo = await axiosInstance.get(
            `/users/${data.user.id}?populate=avatar`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.jwt}`,
              },
            }
          );
          return {
            ...data.user,
            access_token: data.jwt,
            image: userInfo.data.avatar?.url,
          };
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
    async jwt({ token, account, user, trigger, session }) {
      if (account) {
        token.accessToken = user.access_token;
        token.id = user.id;
        token.username = user.username;
        token.firstName = user.firstName || "";
        token.lastName = user.lastName || "";
        token.image = user.image;
      }

      if (trigger === "update") {
        token.firstName = session.user.firstName || "";
        token.lastName = session.user.lastName || "";
        token.image = session.user.image || null;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.name = null;
      session.user.accessToken = token.accessToken;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.user.image = token.image || null;
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
