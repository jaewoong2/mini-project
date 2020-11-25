import AnimatedValue from "./AnimatedValue";
import Shape from "./Shape";
import Vector from "./Vector";

const PI2 = Math.PI * 2;

function createRandomColor(): string {
    const r = Math.min(255, Math.round(Math.random() * 255) + 100);
    const g = Math.round(Math.random() * 20) + 90;
    const b = Math.round(Math.random() * 20) + 90;
    return `rgb(${r}, ${g}, ${b})`;
  }

export default class Circle extends Shape {
    radius: number;
    angle: number;
    speed: number;
    color: string;
    radiusAnimatedValue: AnimatedValue;

    
    constructor(position: Vector) {
        super(position);
        this.radius = 10 * Math.random();
        this.angle = PI2 * Math.random();
        // 2π x 0.1~0.9 는 0~360도 사이를 뜻한다.
        this.speed = 100 * Math.random();
        // 100 ~ 900; PX 기준인듯
        this.color = createRandomColor();
        this.radiusAnimatedValue = new AnimatedValue(0, 1, 300, this.speed * 10);
    }

    update(delta: number) {
        const velocity = this.speed * delta;
        // 랜덤 스피드
        this.position.x += Math.cos(this.angle) * velocity;
        // x = cosA  ; A 는 사이각
        this.position.y += Math.sin(this.angle) * velocity;
        // y = cosA ; A 는 사이각
        this.radiusAnimatedValue.update(delta);
        this.keyboardCheck();
    }

    keyboardCheck() {
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            if(!e.key) return;
            switch(e.key) {
                case 'ArrowRight': {
                    this.angle = PI2 * 1;
                    break;
                }
                case 'ArrowLeft' : {
                    this.angle = PI2 * 0.5;
                    break;
                }
                case 'ArrowUp' : {
                    this.angle = PI2 * 0.75;
                    break;
                }
                case 'ArrowDown' :{
                    this.angle = PI2 * 0.25;
                    break;
                }
                default : return;
            }
        });
    }

    render(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.position.x, this.position.y, this.radius * this.radiusAnimatedValue.value, 0, PI2);
        // arc(x, y, r, 시작지점, 어디까지); 원을 그림
        context.fill();

    }
}