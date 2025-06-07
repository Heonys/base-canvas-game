import { Direction, Team } from "@/constants";
import { GameObject, Vector2d } from "@/core";

export function moveTowards(current: GameObject, destination: Vector2d, speed: number) {
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

export function isCollision(tileSet: Set<string>, x: number, y: number) {
  return tileSet.has(`${x},${y}`);
}

export function isSolidObject(objects: GameObject[], x: number, y: number) {
  return objects.some((obj) => obj.isSolid && obj.position.distanceTo(new Vector2d(x, y)) < 16);
}

export function gridCells(n: number) {
  return n * 16;
}

export function oppositeDirection(dir: Direction) {
  switch (dir) {
    case Direction.DOWN: {
      return Direction.UP;
    }
    case Direction.UP: {
      return Direction.DOWN;
    }
    case Direction.LEFT: {
      return Direction.RIGHT;
    }
    case Direction.RIGHT: {
      return Direction.LEFT;
    }
  }
}

export function oppositeTeam(team: Team) {
  return team === "player" ? "enemy" : "player";
}
