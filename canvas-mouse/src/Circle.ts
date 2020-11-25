import Shape from "./Shape";
import Vector from "./Vector";
import App from './index';

const PI2 = Math.PI * 2;

export default class Circle extends Shape {
    startRadius: number;
    endRadius: number;
    color: string;

    constructor(position: Vector) {
        super(position);
        this.startRadius = 10;
        this.endRadius = 10;
        this.color = `rgba(0, 0, 0, 1)`;
    }
    update() {
        const distance = Math.max(App.instance.mousePosition.distance(this.position), 10);
        this.endRadius = 1000 / distance;
        this.startRadius = this.startRadius - (this.startRadius - this.endRadius) * 0.1;
    }

    render(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.position.x, this.position.y, this.startRadius, 0, PI2);
        // arc(x, y, r, 시작지점, 어디까지); 원을 그림
        context.fill();

    }
}