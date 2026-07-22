export const priceBands = [
  { label: "Under ₹10,000", test: (price: number) => price < 10000 },
  { label: "₹10,000 – ₹50,000", test: (price: number) => price >= 10000 && price < 50000 },
  { label: "₹50,000 – ₹1,50,000", test: (price: number) => price >= 50000 && price < 150000 },
  { label: "Above ₹1,50,000", test: (price: number) => price >= 150000 },
] as const;
