import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  try {
    const response = await prisma.todo.findUnique({
      where: {
        id,
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ msg: "Internal Server Error", error });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const { description } = await req.json();
  try {
    const response = await prisma.todo.update({
      where: {
        id,
      },
      data: {
        description,
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ msg: "Internal Server Error", error });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  try {
    const response = await prisma.todo.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ msg: "Internal Server Error", error });
  }
}
