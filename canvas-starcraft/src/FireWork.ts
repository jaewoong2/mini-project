import Entity from "./Entity";
import EntityManager from "./EntityManager";
import Time from "./Time";
import Vector from "./Vector";

const PI2 = Math.PI * 2;

function createRandomColor(): string {
    const r = Math.round(Math.random() * 150) + 170;
    const g = Math.round(Math.random() * 150) + 170;
    const b = Math.round(Math.random() * 150) + 170;
    return `rgb(${r}, ${g}, ${b})`;
}
  
function sleep(ms : number) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    })
}

export default class FireWork extends Entity {
    angle: number;
    speed: number;
    radius: number;
    color: string;
    velocity: number;
    isBurst: boolean = false; // 플래그 변수

    constructor(position: Vector) {
        super(position);

        this.angle = -Math.PI * 0.5; // 위로 직각
        this.speed = Math.random() * 30 + 30;
        this.radius = Math.random() + 1;
        this.velocity = Math.random() * 15 + 5;
        this.color = createRandomColor();
    }

    createFireworks(speed: number, size : number = 50) {
        // const size = 50;
        const angle = PI2 / size;
        // const speed = 20;
        const velocity = 10;
        const color = this.color;
    
        for (let i = 0; i < size; i++) {
          const firework = new FireWork(
            new Vector(this.position.x, this.position.y)
          );
    
          firework.angle = angle * i;
          firework.isBurst = true;
          firework.speed = speed;
          firework.color = color;
          firework.velocity = velocity;
    
          EntityManager.addEntity(firework);
          // static 멤버 
        }
      }

    async update() {
        const speedVelocity = this.speed * this.velocity * Time.delta;
        this.position.x += Math.cos(this.angle) * speedVelocity;
        this.position.y += Math.sin(this.angle) * speedVelocity;
        this.velocity *= 0.98;

        if (!this.isBurst && this.velocity <= 1) {
            this.isBurst = true;
            this.createFireworks(16, 30); // 50개 만들기
            await sleep(300);
            this.createFireworks(12, 20); // 50개 만들기
            await sleep(300);
            this.createFireworks(10, 10); // 50개 만들기
          } else if (this.isBurst) {
              this.position.y += this.speed * Time.delta * 0.98;
              this.position.y *= 1.0005;

              if(this.velocity <= 1) {
                  EntityManager.removeEntity(this);
              }
          }
    }

    render(context: CanvasRenderingContext2D) {
        context.beginPath();
        // 도형 그리기를 시작한다
        context.fillStyle = this.color;
        context.arc(this.position.x, this.position.y, this.radius, 0, PI2);
        // 중심이 x, y인 원을 그린다.
         
        // 360° = 2π rad
        context.fill();
    }
}