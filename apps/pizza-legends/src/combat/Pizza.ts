import { GameObject, ImageState, resources, Vector2d } from "@/core";
import { Sprite, SpriteText } from "@/gameObject";

type Config = {
  src: ImageState;
  battleType: ImageState;
  position: Vector2d;
  level: number;
};

export class Pizza extends GameObject {
  constructor(config: Config) {
    super(config.position);

    this.addChild(
      new Sprite({
        src: resources.images["combatant-display"],
        frameSize: new Vector2d(60, 14),
        position: new Vector2d(-14, -7),
      }),
    );

    this.addChild(
      new Sprite({
        src: config.battleType,
        frameSize: new Vector2d(32, 32),
        position: new Vector2d(-11, -9),
      }),
    );

    this.addChild(
      new Sprite({
        src: resources.images["pizza-shadow"],
        frameSize: new Vector2d(32, 32),
      }),
    );
    this.addChild(
      new Sprite({
        src: config.src,
        frameSize: new Vector2d(32, 32),
      }),
    );

    this.addChild(
      new SpriteText({
        content: `${config.level}`,
        offset: new Vector2d(40, -18),
        spacing: 0,
      }),
    );
  }

  draw(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    // 아이콘, 체력바, 레벨 표시 박스 설정
    const boxWidth = 18;
    const boxHeight = 13;
    const boxX = x + 46;
    const boxY = y - 7;

    ctx.fillStyle = "#121212";
    ctx.strokeStyle = "#5a5a5a";
    ctx.lineWidth = 2;
    ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);
    ctx.fillRect(boxX, boxY, boxWidth, boxHeight);

    // // 체력 바
    // const hpPercent = 30 / 100;
    // const barX = boxX + 14;
    // const barY = boxY + 4;
    // const barWidth = 24;
    // const barHeight = 6;

    // // 체력 바 배경
    // ctx.fillStyle = "#444";
    // ctx.fillRect(barX, barY, barWidth, barHeight);

    // // 체력 바 전경
    // ctx.fillStyle = "#f25";
    // ctx.fillRect(barX, barY, barWidth * hpPercent, barHeight);

    // // 경험치 바 배경
    // ctx.fillStyle = "#444";
    // ctx.fillRect(barX, barY, barWidth, barHeight);

    // // 경험치치 바 전경
    // ctx.fillStyle = "#f25";
    // ctx.fillRect(barX, barY, barWidth * hpPercent, barHeight);
  }
}
