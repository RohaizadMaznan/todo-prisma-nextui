"use client";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { Button, Input } from "@nextui-org/react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

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
  password: z
    .string()
    .min(6, {
      message: "Password must be atleast 6 characters",
    })
    .max(50, "Password must be less than 50 characters"),
});

export default function SigninForm(props: Props) {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isVisiblePass, setVisiblePass] = React.useState(false);
  const toggleVisiblePass = () => setVisiblePass(!isVisiblePass);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (!result?.ok) {
      toast.error(result?.error);
      return;
    }

    toast.success("Welcome back!");
    router.push(props.callbackUrl ? props.callbackUrl : "/");
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

      <Input
        {...register("password")}
        type={isVisiblePass ? "text" : "password"}
        errorMessage={errors.password?.message}
        isInvalid={!!errors.password}
        label="Password"
        className="col-span-2"
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

      <Button
        className="col-span-2"
        variant="solid"
        type="submit"
        color="primary"
        isDisabled={isSubmitting}
        isLoading={isSubmitting}
      >
        {isSubmitting ? "Signing In..." : "Sign In"}
      </Button>
    </form>
  );
}
