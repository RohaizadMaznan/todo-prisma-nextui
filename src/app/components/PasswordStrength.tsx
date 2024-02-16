import { cn } from "@nextui-org/react";
import React from "react";

type Props = {
  passStength: number;
};

export default function PasswordStrength({ passStength }: Props) {
  return (
    <div
      className={cn("col-span-2 flex gap-2", {
        "justify-around": passStength === 3,
        "justify-start": passStength < 3,
      })}
    >
      {Array.from({ length: passStength + 1 }).map((i, index) => (
        <div
          key={index}
          className={cn("h-2 w-32 rounded-md", {
            "bg-red-500": passStength === 0,
            "bg-orange-500": passStength === 1,
            "bg-yellow-500": passStength === 2,
            "bg-green-500": passStength === 3,
          })}
        ></div>
      ))}
    </div>
  );
}
