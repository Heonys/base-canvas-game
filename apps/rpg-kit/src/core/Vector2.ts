//  2차원 공간에서 (x, y) 좌표를 갖는 벡터로 방향과 크기를 가진 개념
// 위치가 아닌 크기와 방향을 의미
export class Vector2 {
  constructor(
    public x = 0,
    public y = 0,
  ) {
    this.x = x;
    this.y = y;
  }
}
