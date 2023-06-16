import { v4 as uuidv4 } from "uuid";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const userId = request.cookies.get("userId")?.value || uuidv4();
  const response = NextResponse.next();
  response.cookies.set("userId", userId);
  return response;
}

export const config = {
  matcher: ["/", "/product/:handle/"],
};
