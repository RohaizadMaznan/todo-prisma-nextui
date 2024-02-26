"use client";

import { Button, Input } from "@nextui-org/react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { forgotPassword } from "@/lib/actions/authActions";
import { toast } from "react-toastify";

type Props = {
  callbackUrl?: string;
};

const FormSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: "Please enter a valid email address",
    })
    .email("Please enter a valid email address"),
});

export default function ForgotPasswordForm(props: Props) {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const result = await forgotPassword(data.email);
      if (result) toast.success("Reset mail was sent to your email address.");
      reset();
    } catch (error) {
      toast.error("Someting went wrong!");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <Input
        {...register("email")}
        type="email"
        label="Email"
        className="col-span-2"
        errorMessage={errors.email?.message}
        isInvalid={!!errors.email}
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
