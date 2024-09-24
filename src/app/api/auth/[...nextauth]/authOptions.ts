import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { AxiosResponse } from 'axios';

import { ILogInResponse } from '@/lib/types';
import axiosInstance from '@/tools/axios';

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        identifier: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
        rememberMe: { label: 'Remember Me', type: 'checkbox' },
      },
      authorize: async credentials => {
        try {
          const { data }: AxiosResponse<ILogInResponse> =
            await axiosInstance.post('/auth/local', {
              identifier: credentials?.identifier,
              password: credentials?.password,
            });

          const userInfo = await axiosInstance.get(
            `/users/${data.user?.id}?populate=avatar`,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${data.jwt}`,
              },
            },
          );
          return {
            id: String(data.user?.id),
            username: data.user?.username,
            email: data.user?.email,
            accessToken: data.jwt,
            image: userInfo.data.avatar?.url,
            firstName: userInfo.data?.firstName,
            lastName: userInfo.data?.lastName,
            rememberMe: credentials?.rememberMe === 'true',
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, account, user, trigger, session }) {
      if (
        token &&
        typeof token.expires === 'number' &&
        Date.now() >= token.expires
      ) {
        return {
          ...token,
          error: 'TokenExpired',
        };
      }

      if (account) {
        token.accessToken = user.accessToken;
        token.id = user.id;
        token.username = user.username;
        token.firstName = user.firstName || '';
        token.lastName = user.lastName || '';
        token.image = user.image;
        token.rememberMe = user.rememberMe;
      }

      if (trigger === 'update') {
        token.firstName = session.user.firstName || '';
        token.lastName = session.user.lastName || '';
        token.image = session.user.image || null;
      }

      if (token.rememberMe) {
        token.expires = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 days
      } else {
        token.expires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
      }

      return token;
    },
    async session({ session, token }) {
      if (
        !token ||
        typeof token.expires !== 'number' ||
        Date.now() >= token.expires
      ) {
        session = { ...session, user: null };
        return session;
      }

      session.user.id = token.id;
      session.user.username = token.username;
      session.user.name = null;
      session.user.accessToken = token.accessToken;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.user.image = token.image || null;
      session.expires = new Date(token.expires).toISOString();

      return session;
    },
  },
  pages: {
    signIn: '/auth/sign-in',
    newUser: '/auth/sign-up',
  },
};
