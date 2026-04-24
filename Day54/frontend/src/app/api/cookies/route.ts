import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");

  if (!key) {
    return NextResponse.json(
      { message: "Missing key query param" },
      { status: 400 },
    );
  }

  const cookieStore = await cookies();
  const cookie = cookieStore.get(key);

  return NextResponse.json({
    key,
    value: cookie?.value || null,
  });
}
