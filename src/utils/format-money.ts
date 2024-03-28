export const formatValue = (value: number) => {
  const valueFormated = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return valueFormated;
};
