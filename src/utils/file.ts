export const getExtention = (path: string) => {
  // pop 配列から最後の要素を返す
  return path.split(".").pop();
};
