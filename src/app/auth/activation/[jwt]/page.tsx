import { activateUser } from "@/lib/actions/authActions";
import React from "react";

type Props = {
  params: {
    jwt: string;
  };
};

export default async function Page({ params }: Props) {
  const result = await activateUser(params.jwt);
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      {result === "userNotExist" ? (
        <p>User does not exist!</p>
      ) : result === "alreadyActivated" ? (
        <p>The user has already activated</p>
      ) : result === "success" ? (
        <p>User has successfully activated!</p>
      ) : (
        <p>Opps! There is something wrong...</p>
      )}
    </div>
  );
}
