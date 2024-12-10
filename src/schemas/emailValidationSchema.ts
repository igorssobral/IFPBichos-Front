import { z } from "zod";

export const emailSchema = z.object({
  email: z
    .string({ required_error: "Digite seu email" })
    .min(1, { message: "Digite um email válido" })
    .email({ message: "Digite um email válido" }),
});

export type EmailSchema = z.infer<typeof emailSchema>;
