export const getStoryPath = (url: string) => {
  const path = new URL(url).pathname;
  return path.slice('/src/stories/'.length);
};
