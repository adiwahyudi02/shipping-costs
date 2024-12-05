export const formatRupiah = (value: number | string): string => {
  // Ensure the value is a valid number
  const numberValue = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(numberValue)) {
    return "Invalid value";
  }

  // Format the number to Rupiah currency
  return numberValue.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    // Remove decimals
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};
