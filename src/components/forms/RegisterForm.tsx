import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const registerSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

type FormFields = z.infer<typeof registerSchema>;

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log("Registration Data:", data);
    // Handle registration logic here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="text-sm font-medium text-gray-300">Email</label>
        <Input
          placeholder="Enter your email"
          {...register("email")}
          className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
        />
        {errors.email && (
          <span className="text-red-400 text-sm">{errors.email.message}</span>
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-gray-300">Password</label>
        <Input
          type="password"
          placeholder="Enter your password"
          {...register("password")}
          className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
        />
        {errors.password && (
          <span className="text-red-400 text-sm">
            {errors.password.message}
          </span>
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-gray-300">
          Confirm Password
        </label>
        <Input
          type="password"
          placeholder="Confirm your password"
          {...register("confirmPassword")}
          className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
        />
        {errors.confirmPassword && (
          <span className="text-red-400 text-sm">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      <Button
        type="submit"
        className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-xl"
      >
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
