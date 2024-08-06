import z from "zod";

export const signupSchema = z.object({
  username: z.string().min(3).max(20),
  fullname: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(6).max(20),
});

export const loginSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(6).max(20),
});
