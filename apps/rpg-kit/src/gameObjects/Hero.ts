import {
  Vector2,
  GameObject,
  Direction,
  Sprite,
  resources,
  Animations,
  FrameManager,
  eventEmitter,
} from "@/core";
import { isSpaceFree, moveTowards } from "@/utils";
import {
  WALK_DOWN,
  WALK_UP,
  WALK_LEFT,
  WALK_RIGHT,
  STAND_DOWN,
  STAND_LEFT,
  STAND_RIGHT,
  STAND_UP,
  PICK_UP_DOWN,
} from "@/animations/hero";
import { Main, Npc } from "@/gameObjects";

export class Hero extends GameObject {
  facingDirection: Direction = Direction.DOWN;
  itemPickupTime = 0;
  pickupEffect: GameObject | null = null;
  destination: Vector2;
  body: Sprite;
  lastX?: number;
  lastY?: number;
  isLocked = false;

  constructor(x: number, y: number) {
    super(new Vector2(x, y));

    this.addChild(
      new Sprite({
        resource: resources.images.shadow,
        frameSize: new Vector2(32, 32),
        position: new Vector2(-8, -19),
      }),
    );

    this.body = new Sprite({
      resource: resources.images.hero,
      frameSize: new Vector2(32, 32),
      frameCols: 3,
      frameRows: 8,
      currentFrame: 1,
      position: new Vector2(-8, -20),
      animations: new Animations({
        walkDown: new FrameManager(WALK_DOWN),
        walkUp: new FrameManager(WALK_UP),
        walkLeft: new FrameManager(WALK_LEFT),
        walkRight: new FrameManager(WALK_RIGHT),
        standDown: new FrameManager(STAND_DOWN),
        standUp: new FrameManager(STAND_UP),
        standLeft: new FrameManager(STAND_LEFT),
        standRight: new FrameManager(STAND_RIGHT),
        pickUpDown: new FrameManager(PICK_UP_DOWN),
      }),
    });

    this.addChild(this.body);
    this.destination = this.position.duplicate();

    eventEmitter.on("HERO_PICKS_UP_ITEM", this, ({ image, position }) => {
      this.destination = position.duplicate();
      this.itemPickupTime = 1000;

      this.pickupEffect = new GameObject();
      this.pickupEffect.addChild(
        new Sprite({
          resource: image,
          position: new Vector2(0, -18),
        }),
      );
      this.addChild(this.pickupEffect);
    });
  }

  override ready() {
    eventEmitter.on("START_TEXT_BOX", this, () => {
      this.isLocked = true;
    });
    eventEmitter.on("END_TEXT_BOX", this, () => {
      this.isLocked = false;
    });
  }

  override step(delta: number, root: Main) {
    if (this.isLocked) return;

    if (this.itemPickupTime > 0) {
      this.whileItemPickup(delta);
      return;
    }

    if (root.keyTracker.getActionJustPressed("Space")) {
      const neighborObject = this.parent?.children.find((child) => {
        return child.position.matches(this.position.toNeighbor(this.facingDirection));
      });

      if (neighborObject) {
        eventEmitter.emit("HERO_REQUEST_ACTION", neighborObject as Npc);
      }
    }

    const distance = moveTowards(this, this.destination, 1);
    const isArrived = distance <= 1;
    if (isArrived) this.tryMove(root);

    this.positionEmit();
  }

  whileItemPickup(delta: number) {
    this.itemPickupTime -= delta;
    this.body.animations?.play("pickUpDown");

    if (this.itemPickupTime <= 0) {
      this.pickupEffect?.destroy();
    }
  }

  positionEmit() {
    if (this.lastX === this.position.x && this.lastY === this.position.y) return;
    this.lastX = this.position.x;
    this.lastY = this.position.y;
    eventEmitter.emit("HERO_POSITION", this.position);
  }

  tryMove(root: Main) {
    const { keyTracker } = root;

    if (!keyTracker.direction) {
      if (this.facingDirection === Direction.DOWN) this.body.animations?.play("standDown");
      if (this.facingDirection === Direction.UP) this.body.animations?.play("standUp");
      if (this.facingDirection === Direction.LEFT) this.body.animations?.play("standLeft");
      if (this.facingDirection === Direction.RIGHT) this.body.animations?.play("standRight");
      return;
    }

    let nextX = this.destination.x;
    let nextY = this.destination.y;
    const gridSize = 16;

    switch (keyTracker.direction) {
      case Direction.DOWN: {
        nextY += gridSize;
        this.body.animations?.play("walkDown");
        break;
      }
      case Direction.UP: {
        nextY -= gridSize;
        this.body.animations?.play("walkUp");
        break;
      }
      case Direction.LEFT: {
        nextX -= gridSize;
        this.body.animations?.play("walkLeft");
        break;
      }
      case Direction.RIGHT: {
        nextX += gridSize;
        this.body.animations?.play("walkRight");
        break;
      }
    }

    this.facingDirection = keyTracker.direction ?? this.facingDirection;

    const isFree = isSpaceFree(root.level.walls, nextX, nextY);

    const isSolidSpace = root.level.children.find((it) => {
      return it.isSolid && it.position.x === nextX && it.position.y === nextY;
    });

    if (isFree && !isSolidSpace) {
      this.destination.x = nextX;
      this.destination.y = nextY;
    }
  }
}
