const toLoad = {
  "demo-map": "/images/maps/DemoLower.png",
  "demo-map-upper": "/images/maps/DemoUpper.png",
  "map-kitchen": "/images/maps/KitchenLower.png",

  hero: "/images/characters/people/hero.png",
  shadow: "/images/characters/shadow.png",

  npc: "/images/characters/people/npc1.png",
  npc2: "/images/characters/people/npc2.png",

  textBox: "/images/text/text-box.png",
  fontWhite: "/images/text/sprite-font-white.png",
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
