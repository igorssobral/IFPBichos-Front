import { z } from "zod";

function isValidCPF(cpf: string): boolean {
  if (typeof cpf !== "string") return false;
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
  const cpfArray = cpf.split("");
  const validator = cpfArray
    .filter((digit, index, array) => index >= array.length - 2 && digit)
    .map((el) => +el);
  const toValidate = (pop: number) =>
    cpfArray
      .filter((digit, index, array) => index < array.length - pop && digit)
      .map((el) => +el);
  const rest = (count: number, pop: number) =>
    ((toValidate(pop).reduce((soma, el, i) => soma + el * (count - i), 0) *
      10) %
      11) %
    10;
  return !(rest(10, 2) !== validator[0] || rest(11, 1) !== validator[1]);
}

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
      })
      .refine((cpf) => isValidCPF(cpf), { message: "CPF inválido" }), // Adicionando validação do CPF
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
