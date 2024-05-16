import { z } from "zod";

// auth
export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});
export type SignIn = z.infer<typeof SignInSchema>;

export const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});
export type SignUp = z.infer<typeof SignUpSchema>;
