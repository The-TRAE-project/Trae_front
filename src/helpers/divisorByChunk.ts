import { Project } from '../components/ProjectListItem/data';

// eslint-disable-next-line consistent-return
export const divisorByChunk = (data: Project[], chunk: number) => {
  if (data) {
    const result = data.reduce((acc, item, index) => {
      const chunkIndex = Math.floor(index / chunk);

      if (!acc[chunkIndex]) {
        acc[chunkIndex] = [];
      }

      acc[chunkIndex].push(item);

      return acc;
    }, [] as Project[][]);

    return result;
  }
};
