export const selectOnlyIds = (data: { id: number }[]) =>
  data.map((item) => item.id);
