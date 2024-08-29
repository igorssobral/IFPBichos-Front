import { z } from 'zod';

export const reportWithdrawalSchema = z.object({
  campaign: z
    .string({ required_error: 'Escolha a Campanha!' })
    .min(1, { message: 'Campo Obrigatório' }),
  action: z
    .string({ required_error: 'Descreva a ação!' })
    .min(1, { message: 'valor Mínimo R$1' }),
  value: z
    .number({ required_error: 'Digite um valor!' })
    .min(1, { message: 'valor Mínimo R$1' })
    .positive({ message: 'O Valor deve ser positivo!' }),
  file: z
    .string({ required_error: 'Selecione uma imagem!' })
    .min(1, { message: 'O arquivo é obrigatório' })
    .refine((file) => file?.trim() !== '', {
      message: 'O arquivo é obrigatório',
    }),
});

export type ReportWithdrawalSchema = z.infer<typeof reportWithdrawalSchema>;
