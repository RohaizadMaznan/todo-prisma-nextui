import { Button, Card, CardBody, Input, Link } from "@nextui-org/react";
import React from "react";
import SigninForm from "./signin-form";

type Props = {
  searchParams: {
    callbackUrl?: string;
  };
};

export default function Page({ searchParams }: Props) {
  return (
    <div className="grid grid-cols-1 justify-center items-center">
      <div className="flex flex-col items-center space-y-4 mt-[10%]">
        <Card className="w-[350px]">
          <CardBody className="space-y-4">
            <p className="font-semibold text-xl text-center mb-6">Sign-in</p>

            <div className="space-y-4">
              <SigninForm callbackUrl={searchParams.callbackUrl} />
            </div>
          </CardBody>
        </Card>
        <div className="flex space-x-2">
          <p>Don't have account?</p>
          <Link href="/auth/signup">Sign-up</Link>
        </div>

        <Link
          href="/auth/forgot-password"
          className="text-sm justify-end col-span-2"
        >
          Forgot Password?
        </Link>
      </div>
    </div>
  );
}
