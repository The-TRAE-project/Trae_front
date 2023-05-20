export const convertHoursToDays = (hours: number) => {
  if (hours <= 24) {
    if (hours > 20) {
      return `${hours} часа`;
    }
    if (hours <= 20 && hours > 4) {
      return `${hours} часов`;
    }
    if (hours <= 4 && hours > 1) {
      return `${hours} часа`;
    }
    if (hours === 1 && hours > 0) {
      return `${hours} час`;
    }
    return `${hours} часов`;
  }

  const secs = hours * 3600;
  const days = Math.floor(secs / (3600 * 24));

  return `${days} дн`;
};
