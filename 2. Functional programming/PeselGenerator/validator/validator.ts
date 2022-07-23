export const validator = (dateOfBirth: string | number): boolean => {
  const date = new Date(dateOfBirth);
  if (Object.prototype.toString.call(date) !== "[object Date]") return false;
  if (date.getFullYear() < 1800 || date.getFullYear() > 2299) return false;
  return true;
};
