import { z } from 'zod';

// Função que recebe o undirectedBalance e retorna o schema de validação
export const campaignSchema = (undirectedBalance: number) =>
  z.object({
    title: z
      .string({ required_error: 'Adicione um título!', invalid_type_error: '' })
      .min(3, { message: 'Mínimo de 3 caracteres para o título' }),

    description: z
      .string({
        required_error: 'Campo não pode ser vazio!',
        invalid_type_error: '',
      })
      .max(255, { message: 'A descrição deve ter menos de 255 caracteres' })
      .min(1, { message: 'A descrição não pode estar vazia' }),

    undirectedBalance: z
      .number({ required_error: 'Digite um valor!' })
      .min(1, { message: 'Valor mínimo R$1' })
      .positive({ message: 'A doação deve ser um valor positivo!' })
      .max(undirectedBalance, {
        message: `O valor não pode ser maior que R$${undirectedBalance}`,
      }), 
  });

export type CampaignSchema = {
  title: string;
  collectionGoal: number;
  description: string;
  balance: number;
  undirectedBalance: number;
};
