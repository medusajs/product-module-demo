import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";
import { UserData } from "@/types";

export async function POST(request: NextRequest) {
  const { categoryId, categoryName } = ((await request.json()) ??
    {}) as UserData;

  if (!categoryId || !categoryName) {
    return NextResponse.json(null);
  }

  const userData = {
    categoryId,
    categoryName,
  };

  const userId = request.cookies.get("userId")?.value!;
  await kv.set(userId, userData);

  return new NextResponse();
}

export async function DELETE(request: NextRequest) {
  const userData = {
    categoryId: null,
    categoryName: null,
  };

  const userId = request.cookies.get("userId")?.value!;
  await kv.set(userId, userData);

  return new NextResponse();
}
