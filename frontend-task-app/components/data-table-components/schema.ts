import { z } from "zod";

// We're keeping a simple non-relational schema here.
export const taskSchema = z.object({
  id: z.string().optional(),
  priority: z.string(),
  title: z.string(),
  description: z.string().optional(),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"]),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Task = z.infer<typeof taskSchema>;