import { z } from 'zod';

export const donationSchema = z.object({
  donation: z
    .number({ required_error: 'Digite um valor!' })
    .min(1, { message: 'valor Mínimo R$1' })
    .positive({ message: 'A Doação deve ser um valor positivo!' }),
});

export type DonationSchema = z.infer<typeof donationSchema>;
