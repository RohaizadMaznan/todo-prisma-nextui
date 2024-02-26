"use client";

import { Button, Input } from "@nextui-org/react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { resetPassword } from "@/lib/actions/authActions";
import { toast } from "react-toastify";

type Props = {
  jwtUserId: string;
};

const FormSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, {
        message: "Password must be atleast 6 characters",
      })
      .max(50, "Password must be less than 50 characters"),
    confirmPassword: z
      .string()
      .min(6, {
        message: "Password must be atleast 6 characters",
      })
      .max(50, "Password must be less than 50 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password and confirm password does not match!",
    path: ["confirmPassword"], // Display error message not match only on field "confirmPassword"
  });

export default function ResetPasswordForm({ jwtUserId }: Props) {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const result = await resetPassword(jwtUserId, data.confirmPassword);
      if (result === "success")
        toast.success("Your password has been reset successfully!");
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    }
  };

  const [isVisiblePass, setVisiblePass] = React.useState(false);
  const toggleVisiblePass = () => setVisiblePass(!isVisiblePass);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <Input
        {...register("newPassword")}
        type="password"
        label="New Password"
        className="col-span-2"
        errorMessage={errors.newPassword?.message}
        isInvalid={!!errors.newPassword}
        endContent={
          isVisiblePass ? (
            <EyeIcon
              className="w-6 mb-[6px] cursor-pointer"
              onClick={toggleVisiblePass}
            />
          ) : (
            <EyeSlashIcon
              className="w-6 mb-[6px] cursor-pointer"
              onClick={toggleVisiblePass}
            />
          )
        }
      />
      <Input
        {...register("confirmPassword")}
        type="password"
        label="Confirm Password"
        className="col-span-2"
        errorMessage={errors.confirmPassword?.message}
        isInvalid={!!errors.confirmPassword}
      />

      <Button
        className="col-span-2"
        variant="solid"
        type="submit"
        color="primary"
        isDisabled={isSubmitting}
        isLoading={isSubmitting}
      >
        {isSubmitting ? "Resetting..." : "Reset Password"}
      </Button>
    </form>
  );
}
