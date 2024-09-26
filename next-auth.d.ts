import 'next-auth';
import { IImage } from '@/lib/types';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as
   * a prop on the `SessionProvider` React Context
   */
  interface Session {
    refreshTokenExpires?: number;
    accessTokenExpires?: string;
    refreshToken?: string;
    token?: string;
    error?: string;
    user?: User & Session['user'];
  }

  interface User {
    firstName?: string | null;
    lastName?: string | null;
    username?: string;
    email?: string | null;
    id?: string;
    accessToken?: string;
    phoneNumber?: string | number;
    avatar?: IImage;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    refreshTokenExpires?: number;
    accessTokenExpires?: number;
    refreshToken?: string;
    token: string;
    exp?: number;
    iat?: number;
    jti?: string;
  }
}
