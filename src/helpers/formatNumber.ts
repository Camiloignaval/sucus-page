export const milesSeparator = ({ num }: { num: number }) => {
  const opcionesDeFormato = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    useGrouping: true,
    // Separador de miles personalizado
    minimumIntegerDigits: 1,
    minimumSignificantDigits: 1,
    groupingSeparator: ".",
  };

  return num.toLocaleString(undefined, opcionesDeFormato);
};
