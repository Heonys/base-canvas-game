export const gridCells = (n: number) => {
  return n * 16;
};

export const isSpaceFree = (walls: Set<string>, x: number, y: number) => {
  const isWall = walls.has(`${x},${y}`);
  return !isWall;
};
