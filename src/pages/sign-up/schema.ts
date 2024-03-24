import { z } from "zod";

//validações dos inputs utilizando a lib zod
export const signUpSchema = z
  .object({
    name: z
      .string({ required_error: "Digite seu nome!" })
      .min(1, { message: "Digite um nome válido!" }),
    CPF: z
      .string({
        required_error: "Campo não pode ser vazio!",
      })
      .min(1, { message: "Digite seu cpf" })
      .regex(/^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}$/, {
        message: "CPF inválido",
      }),
    phoneNumber: z
      .string({ required_error: "Campo não pode ser vazio!" })
      .min(1, { message: "Digite seu Telefone" })
      .regex(/^\d{11}$/, { message: "Telefone inválido" }),
    email: z
      .string({ required_error: "Digite um email!" })
      .min(1, { message: "Email obrigatório!" })
      .email({ message: "Digite um email válido!" }),
    password: z
      .string({
        required_error: "Campo não pode ser vazio!",
      })
      .min(8, "deve conter no mínimo 8 characters")
      .max(32, "deve conter no máximo 32 characters"),
    confirmPassword: z.string({ required_error: "Repita a senha" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;
