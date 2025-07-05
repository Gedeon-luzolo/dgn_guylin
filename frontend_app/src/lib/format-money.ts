export const formatNumber = (value: number) => {
  const formatedNumber = Number(value);
  return formatedNumber.toLocaleString("en-US");
};
