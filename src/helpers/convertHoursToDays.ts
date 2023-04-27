export const convertHoursToDays = (hours: number) => {
  const secs = hours * 3600;
  const days = Math.floor(secs / (3600 * 24));

  return days;
};
