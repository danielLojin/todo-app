import { z } from "zod";

export const todoSchema = z.object({
  text: z
    .string({ required_error: "Text is required." })
    .min(2, { message: "To-do must be at least 2 character long." })
    .max(100, { message: "To-do must be at most 100 characters long." }),
});
