import { ActorFrames } from "@/animations/actor";
import { CombatantConfig } from "@/constants";
import { Animations, FrameManager, GameObject, resources, Vector2d } from "@/core";
import { Sprite, SpriteText } from "@/gameObject";

export class Combatant extends GameObject {
  name: string;
  actions: string[];
  body: Sprite;
  isBlink = false;

  constructor(
    public position: Vector2d,
    public config: CombatantConfig,
  ) {
    super(position);
    this.actions = config.actions ?? [];
    this.name = config.name;

    this.addChild(
      new Sprite({
        src: config.icon,
        frameSize: new Vector2d(32, 32),
        position: new Vector2d(-7, -9),
      }),
    );

    this.addChild(
      new Sprite({
        src: resources.images["pizza-shadow"],
        frameSize: new Vector2d(32, 32),
      }),
    );
    this.addChild(
      new SpriteText({
        content: `${config.level}`,
        offset: new Vector2d(29, -18),
        spacing: 0,
      }),
    );

    this.body = new Sprite({
      src: config.src,
      frameSize: new Vector2d(32, 32),
      frameCols: 2,
      animations: new Animations({
        stand: new FrameManager(ActorFrames.stand(0)),
        blink: new FrameManager(ActorFrames.blink(0)),
      }),
    });

    this.addChild(this.body);
  }

  draw(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    const boxWidth = 60;
    const boxHeight = 14;
    const boxX = x + 5 + (32 - boxWidth) / 2;
    const boxY = y - 7;

    ctx.fillStyle = "#121212";
    ctx.strokeStyle = "#5a5a5a";
    ctx.lineWidth = 2;
    ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);
    ctx.fillRect(boxX, boxY, boxWidth, boxHeight);

    const hpPercent = Math.max(this.config.hp, 0) / this.config.maxHp;
    const barX = x + 10;
    const barY = y - 4;
    const barWidth = 26;
    const barHeight = 3;

    ctx.fillStyle = "#3a3a3a";
    ctx.fillRect(barX, barY, barWidth * 1, barHeight + 1);
    ctx.fillStyle = "#82ff71";
    ctx.fillRect(barX, barY, barWidth * hpPercent, barHeight);
    ctx.fillStyle = "#3ef126";
    ctx.fillRect(barX, barY + 1, barWidth * hpPercent, barHeight);

    const expPercent = this.config.exp / 100;
    const expBarY = barY + barHeight + 2;
    const expBarHeight = 2;

    ctx.fillStyle = "#3a3a3a";
    ctx.fillRect(barX, expBarY, barWidth * 1, expBarHeight + 1);
    ctx.fillStyle = "#ffd76a";
    ctx.fillRect(barX, expBarY, barWidth * expPercent, expBarHeight);
    ctx.fillStyle = "#ffc934";
    ctx.fillRect(barX, expBarY + 1, barWidth * expPercent, expBarHeight);

    if (this.isBlink) {
      this.body.animations?.play("blink");
    } else {
      this.body.animations?.play("stand");
    }
  }
}
