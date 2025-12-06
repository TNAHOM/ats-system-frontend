import { z } from "zod";

export const jobFormSchema = z.object({
  title: z.string().min(2, "Job title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  responsibilities: z
    .string()
    .min(10, "Responsibilities must be at least 10 characters"),
  requirements: z
    .string()
    .min(10, "Requirements must be at least 10 characters"),
  workArrangement: z.enum(["remote", "onsite", "hybrid"]),
  salaryRange: z.string().optional(),
  deadline: z.string().min(1, "Deadline is required"),
  location: z.string().min(2, "Location must be at least 2 characters"),
});

export type JobFormValues = z.infer<typeof jobFormSchema>;
