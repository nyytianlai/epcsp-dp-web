export const getImageUrl = (dir: string) => {
    return new URL(`../assets/images/map/${dir}.png`, import.meta.url).href
  }