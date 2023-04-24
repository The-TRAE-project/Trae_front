export interface AdditionalOperation {
  idx: number;
  isVisible: boolean;
}

export const setAdditionalOperation = () => ({
  idx: Math.floor(Math.random() * 1000),
  isVisible: true,
});
