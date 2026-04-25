import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error("JWT_SECRET environment variable is not set");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    const token = jwt.sign({ email }, secret as string, {
      expiresIn: "1d",
    });

    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}