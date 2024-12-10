import { z } from 'zod';

export const manualDonationSchema = z.object({
  action: z
    .string({ required_error: 'Digite uma Ação!' })
    .min(1, { message: 'Campo Obrigatório' }),
  motivation: z
    .string({ required_error: 'Descreva a motivação!' })
    .min(1, { message: 'valor Mínimo R$1' }),
  ammountCollect: z
    .number({ required_error: 'Digite um valor!' })
    .min(1, { message: 'valor Mínimo R$1' })
    .positive({ message: 'A Doação deve ser um valor positivo!' }),
});

export type ManualDonationSchema = z.infer<typeof manualDonationSchema>;
