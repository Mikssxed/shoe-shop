import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const res = NextResponse.next();

  const token = await getToken({ req });
  const pathnamePage = pathname.split('/')[1];

  if (
    token &&
    (token.error || new Date(token.expires).valueOf() < Date.now())
  ) {
    const response = NextResponse.next();
    response.cookies.set('__Secure-next-auth.session-token', '', { 
      path: '/', 
      expires: new Date(0), 
      httpOnly: true, 
      sameSite: 'strict', 
      secure: process.env.NODE_ENV === 'production' 
    });

    response.cookies.set('__Host-next-auth.csrf-token', '', { 
      path: '/', 
      expires: new Date(0), 
      httpOnly: true, 
      sameSite: 'strict', 
      secure: process.env.NODE_ENV === 'production' 
    });
  }

  if ((pathnamePage === 'auth' && token) || pathnamePage === '') {
    const url = new URL(`/products`, req.url);
    return NextResponse.redirect(url);
  }
  if (pathnamePage !== 'auth' && !token) {
    const url = new URL(`/auth/sign-in`, req.url);
    return NextResponse.redirect(url);
  }

  return res;
}

export const config = {
  matcher: [
    '/profile/add-product',
    '/profile/my-products',
    '/profile/settings',
    '/auth/:path*',
    '/',
  ],
};
