import { z } from "zod";

export const passwordSchema = z
  .string({
    required_error: "Campo não pode ser vazio!",
  })
  .min(8, "Deve conter no mínimo 8 caracteres")
  .max(32, "Deve conter no máximo 32 caracteres");

export const confirmPasswordSchema = z
  .string({
    required_error: "Repita a senha",
  });

export const passwordValidationSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type PasswordValidationSchema = z.infer<typeof passwordValidationSchema>;
