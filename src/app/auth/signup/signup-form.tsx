"use client";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { Button, Checkbox, Input, Link } from "@nextui-org/react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import validator from "validator";
import { passwordStrength } from "check-password-strength";
import PasswordStrength from "@/app/components/PasswordStrength";
import { registerUser } from "@/lib/actions/authActions";
import { toast } from "react-toastify";

type Props = {};

const FormSchema = z
  .object({
    firstName: z.string().min(6, {
      message: "This field is required",
    }),
    lastName: z.string().min(6, {
      message: "This field is required",
    }),
    email: z
      .string()
      .min(2, {
        message: "This field is required",
      })
      .email("Please enter a valid email address"),
    phone: z.string().refine(validator.isMobilePhone),
    password: z
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
    accepted: z.literal(true, {
      errorMap: () => ({
        message: "Please accept all terms",
      }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password does not match!",
    path: ["confirmPassword"], // Display error message not match only on field "confirmPassword"
  });

export default function SignupForm({}: Props) {
  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [isVisiblePass, setVisiblePass] = React.useState(false);
  const toggleVisiblePass = () => setVisiblePass(!isVisiblePass);

  const [passStrength, setPassStrength] = React.useState<number>(0);
  React.useEffect(() => {
    setPassStrength(passwordStrength(watch().password).id);
  }, [watch().password]);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const { confirmPassword, accepted, ...user } = data;

    try {
      await registerUser(user);
      toast.success("User register successfully", { toastId: 1 });
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <Input
        {...register("firstName")}
        name="firstName"
        type="text"
        label="First Name"
        errorMessage={errors.firstName?.message}
        isInvalid={!!errors.firstName}
      />
      <Input
        {...register("lastName")}
        type="text"
        label="Last Name"
        errorMessage={errors.lastName?.message}
        isInvalid={!!errors.lastName}
      />
      <Input
        {...register("email")}
        type="email"
        label="Email"
        className="col-span-2"
        errorMessage={errors.email?.message}
        isInvalid={!!errors.email}
      />
      <Input
        {...register("phone")}
        type="text"
        label="Phone"
        className="col-span-2"
        errorMessage={errors.phone?.message}
        isInvalid={!!errors.phone}
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
      {watch().password.length > 0 && (
        <PasswordStrength passStength={passStrength} />
      )}
      <Input
        {...register("confirmPassword")}
        errorMessage={errors.confirmPassword?.message}
        isInvalid={!!errors.confirmPassword}
        type="password"
        label="Confirm Password"
        className="col-span-2"
      />
      <Controller
        control={control}
        name="accepted"
        render={({ field }) => (
          <Checkbox
            onChange={field.onChange}
            onBlur={field.onBlur}
            className="col-span-2"
          >
            I Accept the <Link href="/terms">Terms & Conditions</Link>
          </Checkbox>
        )}
      />

      <Button
        className="col-span-2"
        variant="solid"
        type="submit"
        color="primary"
      >
        Sign me up!
      </Button>
    </form>
  );
}
