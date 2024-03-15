import { z } from "zod";


export const createCampaignSchema = z.object({
  title: z
    .string({ required_error: "Adicione um título!", invalid_type_error: "" })
    .min(3, { message: "Mínimo de 3 caracteres para o título" }),

  description: z
    .string({
      required_error: "Campo não pode ser vazio!",
      invalid_type_error: "",
    })
    .max(255, { message: "A descrição deve ter menos de 255 caracteres" })
    .min(1, { message: "A descrição não pode estar vazia" }),

  fundraisingGoal: z.coerce
    .number({
      required_error: "Campo não pode ser vazio!",
      invalid_type_error: "Digite uma meta",
    })
    .positive({ message: "Digite uma meta válida" }),

  startDate: z.coerce
    .date({
      required_error: "Escolha uma data!",
      invalid_type_error: "Escolha uma data",
    })
    .refine((data) => data > new Date(), { message: "Data Inválida" }),
  finishedDate: z.coerce
    .date({
      required_error: "Escolha uma data!",
      invalid_type_error: "Escolha uma data",
    })
    .refine((data) => data > new Date(), {
      message: "Data final precisa ser maior que a de inicio",
    }),

  file: z
    .string({ required_error: "Selecione uma imagem!" })
    .min(1, { message: "O arquivo é obrigatório" })
    .refine((file) => file?.trim() !== "", {
      message: "O arquivo é obrigatório",
    }),
});

export type CreateCampaignSchema = z.infer<typeof createCampaignSchema>;
