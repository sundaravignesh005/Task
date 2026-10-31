
const fmt = new Intl.NumberFormat("en-IN", {
  
  style: "currency",
  
  currency: "INR",
  minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

export const money = (n) => fmt.format(n);
