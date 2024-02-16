import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { Button, Card, CardBody, Input, Link } from "@nextui-org/react";
import React from "react";
import SignupForm from "./signup-form";

type Props = {};

export default function Page({}: Props) {
  return (
    <div className="grid grid-cols-1 justify-center items-center">
      <div className="flex flex-col items-center space-y-4 mt-[5%]">
        <Card className="w-[500px]">
          <CardBody className="space-y-4">
            <p className="font-semibold text-xl text-center mb-6">Register</p>

            <SignupForm />
          </CardBody>
        </Card>
        <div className="flex space-x-2">
          <p>Existing user?</p>
          <Link href="/auth/signin">Sign-in</Link>
        </div>
      </div>
    </div>
  );
}
