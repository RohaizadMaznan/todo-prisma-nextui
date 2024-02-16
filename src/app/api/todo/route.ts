import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  let body = (await req.json()) as { description: string };

  try {
    const response = await prisma.todo.create({
      data: {
        description: body.description,
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ msg: "Internal Server Error", error });
  }
}

export async function GET(req: NextRequest) {
  try {
    const response = await prisma.todo.findMany();

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ msg: "Internal server error", error });
  }
}
