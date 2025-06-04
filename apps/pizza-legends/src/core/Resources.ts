const toLoad = {
  // map
  "demo-map": "/images/maps/DemoLower.png",
  "demo-map-upper": "/images/maps/DemoUpper.png",
  "map-kitchen": "/images/maps/KitchenLower.png",
  "street-battle": "/images/maps/StreetBattle.png",

  // character
  hero: "/images/characters/people/hero.png",
  shadow: "/images/characters/shadow.png",
  npc: "/images/characters/people/npc1.png",
  npc2: "/images/characters/people/npc2.png",
  npc3: "/images/characters/people/npc3.png",

  // pizzas
  s001: "/images/characters/pizzas/s001.png",
  v001: "/images/characters/pizzas/v001.png",
  f001: "/images/characters/pizzas/f001.png",
  "pizza-shadow": "/images/characters/pizzas/pizza-shadow.png",

  // icon
  spicy: "/images/icons/spicy.png",
  veggie: "/images/icons/veggie.png",
  fungi: "/images/icons/fungi.png",
  chill: "/images/icons/chill.png",

  // etc
  textBox: "/images/text/text-box.png",
  fontWhite: "/images/text/sprite-font-white.png",
  "combatant-display": "/images/ui/SingleMemberDisplay.png",
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
