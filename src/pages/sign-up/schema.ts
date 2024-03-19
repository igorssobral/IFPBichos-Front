import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string({ required_error: "Digite seu nome!" })
    .min(1, { message: "Digite um nome válido!" }),
  cpf: z
    .string({
      required_error: "Campo não pode ser vazio!",
    })
    .min(1, { message: "Digite seu cpf" }),
  phone: z
    .string({
      required_error: "Campo não pode ser vazio!",
    })
    .min(1, { message: "Digite seu Telefone" }),
  email: z
    .string({ required_error: "Digite um email!" })
    .min(1, { message: "Digite um email válido!" })
    .email({ message: "Digite um email válido!" }),
  password: z
    .string({
      required_error: "Campo não pode ser vazio!",
    })
    .min(1, { message: "Digite sua Senha" }),
  confirmPassword: z
    .string({
      required_error: "Campo não pode ser vazio!",
    })
    .min(1, { message: "Digite sua Senha" }),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
