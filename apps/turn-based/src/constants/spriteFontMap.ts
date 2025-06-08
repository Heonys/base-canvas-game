const DEFAULT_WIDTH = 5;
const widthMap = new Map<string, number>();

widthMap.set("c", 4);
widthMap.set("f", 4);
widthMap.set("i", 2);
widthMap.set("j", 4);
widthMap.set("l", 3);
widthMap.set("n", 4);

widthMap.set("r", 4);
widthMap.set("t", 4);
widthMap.set("u", 4);
widthMap.set("v", 4);
widthMap.set("x", 4);
widthMap.set("y", 4);
widthMap.set("z", 4);

widthMap.set("E", 4);
widthMap.set("F", 4);
widthMap.set("M", 7);
widthMap.set("W", 7);

widthMap.set(" ", 3);
widthMap.set("'", 1);
widthMap.set("!", 1);

export const getCharacterWidth = (char: string) => {
  return widthMap.get(char) ?? DEFAULT_WIDTH;
};

const frameMap = new Map<string, number>();
["abcdefghijklmnopqrstuvwxyz", "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "0123456789 __", ".!-,?'"]
  .join("")
  .split("")
  .forEach((char, index) => {
    frameMap.set(char, index);
  });

export const getCharacterFrame = (char: string) => {
  return frameMap.get(char) ?? 0;
};
