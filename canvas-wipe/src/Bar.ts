import { pick } from "lodash";
import Shape from "./Shape";
import Vector from "./Vector";

// 식 출처 : https://mygumi.tistory.com/346

export default class Bar extends Shape {
    speed: number;
    color: string;
    width: number;
    height: number;
    angle: number = 2 * Math.PI;
    turn: boolean = false;
    size: number; 

    constructor(position: Vector) {
        super(position);
        this.speed = 0.0086;
        this.color = "rgba(20, 50, 150, 0.5)";
        this.width = 0; //  -100 < x < 100 
        this.height = 0; // 0 < y 100
        this.size = 0;
    }


    update() {
        if(!this.turn) {
            if(this.angle > Math.PI) {
                this.angle *= (1 - this.speed);
            } 
            if(this.angle < Math.PI) {
                this.turn = true;
            }
        } else {
            if(this.angle < 2 * Math.PI) {
                this.angle *= (1 + this.speed);   
            }
            if(this.angle > Math.PI * 2) {
                this.turn = false;
            }
        }
    }


    render(context: CanvasRenderingContext2D) {
        this.size = Math.sqrt(Math.pow(context.canvas.width, 2) + Math.pow(context.canvas.height, 2)) * 0.35;
        
        context.beginPath();
        context.strokeStyle = this.color;
        context.lineWidth = 30;
        context.moveTo(this.position.x, this.position.y);
        context.lineTo(
            this.position.x + (Math.cos(-this.angle) * this.size),
            this.position.y - (Math.sin(-this.angle) * this.size)
            );
        context.stroke();
        context.closePath();
    }
}