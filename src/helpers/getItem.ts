export const getItem = (key: string) =>
  JSON.parse(localStorage.getItem(key) as string);
