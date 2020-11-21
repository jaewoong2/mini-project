import Shape from "./Shape";
import Time from "./Time";
import Vector from "./Vector";

const doublePI = Math.PI * 2;

const dropAngleCreator = () => {
    const randomAngle = Math.random();
    return randomAngle > 0.5 ? 0.25 + randomAngle * 0.1 : 0.25 - randomAngle * 0.1;
}

export default class Circle extends Shape {
    radius: number;
    angle: number;
    speed: number;
    color: string;
    isFloor: boolean = false;

    constructor(position: Vector) {
        super(position);
        this.radius = 5 * Math.random() + 3;
        this.angle =  doublePI * dropAngleCreator();
        this.speed = 30 + 70 * Math.random();
        this.color = '#ffffff';
    }

    update() {
        const velocity = this.speed * Time.delta;

        if(!this.isFloor) {
            this.position.x += Math.cos(this.angle) * velocity;
            this.position.y += Math.sin(this.angle) * velocity;
        }
    }


    render(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.position.x, this.position.y, this.radius, 0, doublePI);
        context.fill();

        if(this.position.y > context.canvas.height - 30) {
            this.isFloor = true;
        }
    }
}