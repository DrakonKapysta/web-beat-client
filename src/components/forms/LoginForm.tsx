import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import type { LoginData } from "./types/Auth.dto";

const loginSchema = z.object({
  login: z.string().email("Invalid email address"),
  password: z.string().min(4, "Password must be at least 4 characters long"),
  username: z.string().optional(),
});

interface LoginFormProps {
  onSubmit: (data: LoginData) => void;
  disabled?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  disabled = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="text-sm font-medium text-gray-300">Email</label>
        <Input
          type="text"
          placeholder="Enter your Email"
          {...register("login")}
          disabled={disabled}
          className={`bg-white/10 border-white/20 text-white placeholder:text-gray-300 focus:border-purple-400 focus:ring-purple-400 ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        />
        {errors.login && (
          <span className="text-red-400 text-sm">{errors.login.message}</span>
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-gray-300">Password</label>
        <Input
          type="password"
          placeholder="Enter your password"
          {...register("password")}
          disabled={disabled}
          className={`bg-white/10 border-white/20 text-white placeholder:text-gray-300 focus:border-purple-400 focus:ring-purple-400 ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        />
        {errors.password && (
          <span className="text-red-400 text-sm">
            {errors.password.message}
          </span>
        )}
      </div>

      <Button
        type="submit"
        disabled={disabled}
        className={`w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 ${
          disabled ? "opacity-50 cursor-not-allowed hover:scale-100" : ""
        }`}
      >
        {disabled ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            Signing in...
          </>
        ) : (
          "Login"
        )}
      </Button>
    </form>
  );
};
