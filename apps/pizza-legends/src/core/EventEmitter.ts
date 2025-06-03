import { GameObject, Vector2d } from "@/core";

type EventListener<T> = {
  id: number;
  eventName: keyof T;
  caller: GameObject;
  fn: (payload: any) => any;
};

class EventEmitter<EventMap> {
  listeners: EventListener<EventMap>[] = [];
  nextId: number = 0;

  on<T extends keyof EventMap>(
    eventName: T,
    caller: GameObject,
    fn: (payload: EventMap[T]) => void,
  ) {
    this.nextId += 1;
    this.listeners.push({ id: this.nextId, eventName, caller, fn });
    return this.nextId;
  }

  off(id: number) {
    this.listeners = this.listeners.filter((it) => it.id !== id);
  }

  emit<T extends keyof EventMap>(eventName: T, payload?: EventMap[T]) {
    this.listeners.forEach((listener) => {
      if (listener.eventName === eventName) {
        listener.fn(payload);
      }
    });
  }

  unsubscribe(caller: GameObject) {
    this.listeners = this.listeners.filter((it) => it.caller !== caller);
  }
}

type EventPayloadMap = {
  PLAYER_POSITION: Vector2d;
  COMPLATE_STAND: GameObject;
  COMPLATE_WALK: GameObject;
  OPEN_TEXT_BOX: GameObject;
  START_TEXT_BOX: void;
  END_TEXT_BOX: void;
};

export const eventEmitter = new EventEmitter<EventPayloadMap>();
