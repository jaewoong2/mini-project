export default class Vector {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public angleBetween(other: Vector): number {
        return Math.atan2(other.y - this.y, other.x - this.x);
        // x, y의 사잇각 구하기
        // 아크탄젠트
      }
    
    public distance(other: Vector): number {
    return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));
    // x,y의 벡터값
    }
}