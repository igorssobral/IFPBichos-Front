import { z } from "zod";

export const loginSchema = z.object({
  login: z
    .string({ required_error: "Digite seu email" })
    .min(1, { message: "Digite um email válido" })
    .email({ message: "Digite um email válido" }),
  password: z
    .string({
      required_error: "Digite sua senha",
    })
    .min(1, { message: "Digite sua Senha" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
