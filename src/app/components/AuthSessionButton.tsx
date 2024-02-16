"use client";

import { Button } from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import React from "react";
import Link from "next/link";

type Props = {};

export default function AuthSessionButton({}: Props) {
  const { data: session } = useSession();

  return (
    <div className="flex items-center gap-2">
      {session && session.user ? (
        <div className="flex items-center space-x-4">
          <p>{session.user.email}</p>
          <Button as={Link} href="/api/auth/signout">
            Sign Out
          </Button>
        </div>
      ) : (
        <>
          <Button onClick={() => signIn()}>
            Sign In
          </Button>
          <Button as={Link} href="/auth/signup">
            Sign Up
          </Button>
        </>
      )}
    </div>
  );
}
