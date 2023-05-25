import { kv } from "@vercel/kv";
import { v4 as uuidv4 } from "uuid";
import { NextRequest, NextResponse } from "next/server";
import { UserData } from "@/types";

export async function POST(request: NextRequest) {
  const { categoryId, categoryName } = (request.body ?? {}) as UserData;

  if (!categoryId || !categoryName) {
    return NextResponse.json(null);
  }

  const userData = {
    categoryId,
    categoryName
  }

  const userId = request.cookies.get("userId")?.value || uuidv4();
  await kv.set(userId, userData);

  const response = new NextResponse();
  response.cookies.set("userId", userId);

  response.json()
}
