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
    isWall: boolean = false;
    velocity: number = 5;

    constructor(position: Vector) {
        super(position);
        this.radius = 5 * Math.random() + 3;
        this.angle =  doublePI * dropAngleCreator();
        this.speed = 100 + 70 * Math.random();
        this.color = '#ffff';
    }

    update() {
        const speedVelocity = this.speed * this.velocity * Time.delta;
        const velocity = this.speed * Time.delta;
        
        if(this.isFloor) {
            this.velocity *= 0.98;
            this.position.y += -Math.sin(this.angle) * speedVelocity;
            if(this.velocity < 0.05) {
                this.velocity = 5;
                this.isFloor = false;
            }
        } 

        if(this.isWall) {
            this.position.x += -Math.cos(this.angle) * speedVelocity;
        }

        if(!this.isFloor) {
            this.position.y += Math.sin(this.angle) * velocity;
        }

        if(this.position.x < 0) {
            this.position.x += -Math.cos(this.angle) * speedVelocity;
        }

    }


    render(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.position.x, this.position.y, this.radius, 0, doublePI);
        context.fill();

        if(this.position.x > context.canvas.width) {
            this.isWall = true;
        } 

        if(this.position.y > context.canvas.height) {
            this.isFloor = true;
        }
        if(this.position.y < 0) {
            this.isFloor = false;
        }
    }
}