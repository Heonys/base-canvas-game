import type { GameObject, Vector2 } from "@/core";

export function moveTowards(current: GameObject, destination: Vector2, speed: number) {
  let dx = destination.x - current.position.x;
  let dy = destination.y - current.position.y;
  let distance = Math.sqrt(dx ** 2 + dy ** 2);

  if (distance <= speed) {
    current.position.x = destination.x;
    current.position.y = destination.y;
  } else {
    const normalizedX = dx / distance;
    const normalizedY = dy / distance;

    current.position.x += normalizedX * speed;
    current.position.y += normalizedY * speed;

    dx = destination.x - current.position.x;
    dy = destination.y - current.position.y;
    distance = Math.sqrt(dx ** 2 + dy ** 2);
  }

  return distance;
}
