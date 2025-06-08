import { GameObject } from "@/core";

class Store<T> {
  private map = new Map<string, T>();

  find(id: string) {
    return this.map.get(id);
  }

  register(id: string, value: T) {
    this.map.set(id, value);
  }

  has(id: string) {
    return this.map.has(id);
  }

  values() {
    return this.map.values();
  }

  remove(data: T) {
    for (const [key, value] of this.map.entries()) {
      if (value === data) {
        this.map.delete(key);
        return;
      }
    }
  }
}

export const store = new Store<GameObject>();
