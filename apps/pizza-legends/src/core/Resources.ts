const toLoad = {
  map: "/images/maps/DemoLower.png",
  hero: "/images/characters/people/hero.png",
  shadow: "/images/characters/shadow.png",
  npc: "/images/characters/people/npc1.png",
};
type ResourceKey = keyof typeof toLoad;

export type ImageState = {
  image: HTMLImageElement;
  isLoaded: boolean;
};

class Resources {
  images: Record<ResourceKey, ImageState> = {} as Record<ResourceKey, ImageState>;

  constructor() {
    Object.entries(toLoad).forEach(([key, src]) => {
      const imageKey = key as ResourceKey;
      const img = new Image();
      img.src = src;
      this.images[imageKey] = { image: img, isLoaded: false };

      img.addEventListener("load", () => {
        this.images[imageKey].isLoaded = true;
      });
    });
  }
}

export const resources = new Resources();
