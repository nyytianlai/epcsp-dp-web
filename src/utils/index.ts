export const getImageUrl = (dir: string) => {
  return new URL(`../assets/images/map/${dir}.png`, import.meta.url).href;
};
export const getImageByCloud = (picName: string) => {
  return `${import.meta.env.VITE_FD_FileURL}/data/images/${picName}.png`;
};
