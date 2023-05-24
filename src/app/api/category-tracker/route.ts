import { kv } from "@vercel/kv";
import { v4 as uuidv4 } from "uuid";
import { NextRequest, NextResponse } from "next/server";

export type UserData = {
  categoryId: string;
  categoryName: string;
};

export async function GET(request: NextRequest) {
  const categoryId = request.headers.get("x-recent-category-id");
  const categoryName = request.headers.get("x-recent-category-name");

  if (!categoryId || !categoryName) {
    return;
  }

  const userId = request.cookies.get("userId")?.value || uuidv4();
  const userData: UserData = (await kv.get(userId)) || ({} as UserData);

  userData.categoryId = categoryId;
  userData.categoryName = categoryName;

  await kv.set(userId, userData);

  const response = new NextResponse();
  response.cookies.set("userId", userId);

  return response;
}
