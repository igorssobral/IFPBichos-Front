import { z } from 'zod';

export const reportWithdrawalSchema = z.object({
  campaign: z
    .number({ required_error: 'Escolha a Campanha!' })
    .min(1, { message: 'Campo Obrigatório' }),
  action: z
    .string({ required_error: 'Selecione uma campanha!' })
    .min(1, { message: 'Selecione uma campanha!' }),
  value: z
    .number({ required_error: 'Selecione uma campanha!' })
    .min(1, { message: 'valor Mínimo R$1' })
    .positive({ message: 'O Valor deve ser positivo!' }),
  file: z
    .string({ required_error: 'Adicione um comprovante!' })
    .min(1, { message: 'O arquivo é obrigatório' })
    .optional()
    .refine((file) => file?.trim() !== '', {
      message: 'O arquivo é obrigatório',
    }),
});

export type ReportWithdrawalSchema = z.infer<typeof reportWithdrawalSchema>;
