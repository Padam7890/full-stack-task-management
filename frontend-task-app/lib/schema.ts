import { z } from "zod";


export const AuthformSchema = (type:string)=> z.object({

    name: type === "sign-in" ? z.string().optional(): z.string().min(3),  
    email: z.string().email(),
    password: z.string().min(8),
  });

  export const TaskSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
    status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"]),
  });
  

  export const ResetPasswordSchema = z.object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });