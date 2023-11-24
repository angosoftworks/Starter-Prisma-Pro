import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  console.log(request, 'ddd');
  const res = NextResponse.next();
  return res;
}

//export const config = {
//matcher: ['/dashboard/:path*']
//};
