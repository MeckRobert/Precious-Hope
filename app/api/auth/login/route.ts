import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error("JWT_SECRET environment variable is not set");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // ⚠️ Replace this with real DB check (Prisma later)
    if (email !== "test@example.com" || password !== "123456") {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign({ email }, secret, { expiresIn: "1d" });

    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}