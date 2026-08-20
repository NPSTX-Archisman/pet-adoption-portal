import { z } from "zod";

export const LoginSchema = z.object({
  email: z.email("Invalid email address"),

  password: z.string().min(6, "Password must be at least 6 characters"),});

export const RegisterSchema = z.object({
  fullName: z.string().min(2, "Name is too short"),

  email: z.email("Invalid email address"),

  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginForm =
  z.infer<typeof LoginSchema>;

export type RegisterForm =
  z.infer<typeof RegisterSchema>;