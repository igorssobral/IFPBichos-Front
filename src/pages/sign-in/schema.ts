import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Digite um email!" })
    .min(1, { message: "Digite um email válido!" })
    .email({ message: "Digite um email válido!" }),
  password: z
    .string({
      required_error: "Campo não pode ser vazio!",
    })
    .min(1, { message: "Digite sua Senha" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
