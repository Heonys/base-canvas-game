import { GameObject } from "@/core";

class Store {
  private map = new Map<string, GameObject>();

  find(id: string) {
    return this.map.get(id);
  }

  register(id: string, gameObject: GameObject) {
    this.map.set(id, gameObject);
  }

  has(id: string) {
    return this.map.has(id);
  }

  entries() {
    return this.map.entries();
  }

  remove(gameObject: GameObject) {
    for (const [key, value] of this.map.entries()) {
      if (value === gameObject) {
        this.map.delete(key);
        return;
      }
    }
  }
}

export const store = new Store();
