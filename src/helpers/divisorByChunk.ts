/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line consistent-return
export const divisorByChunk = (data: any[], chunk: number) => {
  if (data) {
    const result = data.reduce((acc, item, index) => {
      const chunkIndex = Math.floor(index / chunk);

      if (!acc[chunkIndex]) {
        acc[chunkIndex] = [];
      }

      acc[chunkIndex].push(item);

      return acc;
    }, [] as any[][]);

    return result;
  }
};
