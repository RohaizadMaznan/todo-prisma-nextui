import { Card, CardBody, Link } from "@nextui-org/react";
import React from "react";
import ResetPasswordForm from "./reset-password-form";
import { verifyJwt } from "@/lib/jwt";

type Props = {
  params: {
    jwt: string;
  };
};

export default async function Page({ params }: Props) {
  const payload = verifyJwt(params.jwt);

  if (!payload)
    return (
      <div className="flex items-center h-screen text-2xl">
        The URL is not valid!
      </div>
    );

  return (
    <div className="grid grid-cols-1 justify-center items-center">
      <div className="flex flex-col items-center space-y-4 mt-[10%]">
        <Card className="w-[350px]">
          <CardBody className="space-y-4">
            <p className="font-semibold text-xl text-center mb-6">
              Reset Password
            </p>

            <div className="space-y-4">
              <ResetPasswordForm jwtUserId={params.jwt} />
            </div>
          </CardBody>
        </Card>

        <div className="flex space-x-1">
          <p>Remember your password?</p>
          <Link href="/auth/signin" className="text-sm justify-end col-span-2">
            Sign-in
          </Link>
        </div>
      </div>
    </div>
  );
}
