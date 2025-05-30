export class ActorFrames {
  static stand(rootFrame: number) {
    return {
      duration: 0,
      frames: [{ time: 0, frame: rootFrame }],
    };
  }

  static walk(rootFrame: number) {
    return {
      duration: 400,
      frames: [
        { time: 0, frame: rootFrame + 1 },
        { time: 100, frame: rootFrame },
        { time: 200, frame: rootFrame + 3 },
        { time: 300, frame: rootFrame },
      ],
    };
  }
}
