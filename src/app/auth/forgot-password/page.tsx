import { Card, CardBody, Link } from "@nextui-org/react";
import React from "react";
import ForgotPasswordForm from "./forgot-password-form";

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
            <p className="font-semibold text-xl text-center mb-6">
              Forgot Your Password?
            </p>

            <div className="space-y-4">
              <ForgotPasswordForm callbackUrl={searchParams.callbackUrl} />
            </div>
          </CardBody>
        </Card>

        <Link href="/auth/signin" className="text-sm justify-end col-span-2">
          Back
        </Link>
      </div>
    </div>
  );
}
