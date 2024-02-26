import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

type Props = {};

export default async function Page({}: Props) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <div>
      <p>First name: {user?.firstName}</p>
      <p>Last name: {user?.lastName}</p>
      <p>Email: {user?.email}</p>
      <p>Phone No.: {user?.phone}</p>
    </div>
  );
}
