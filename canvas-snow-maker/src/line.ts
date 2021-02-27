import { toUpper } from "lodash";
import App from "src";
import Circle from "./Circle";
import Vector from "./Vector";

export default class Line {
    isDrag: boolean;
    startX: number;
    startY: number;
    position: {
        top: number;
        bottom: number;
        left: number;
        right: number;
    }
    app: App;

    constructor(app: App) {
        this.isDrag = false
        this.startX = 0;
        this.startY = 0;
        this.position = {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        };
        this.app = app;
    }

    run(context: CanvasRenderingContext2D) {

        window.addEventListener('mousedown', (e: MouseEvent) => {
            if(e.button === 2 || e.button === 1) {
                return;
            }
            this.position = {
                top: e.offsetY,
                bottom: e.offsetY,
                left: e.offsetX,
                right: e.offsetX,
            }
            this.startX = e.clientX;
            this.startY = e.clientY;
            this.isDrag = true
        });

        window.addEventListener('mouseup', () => {
            this.app.entities.addEntity(new Circle(new Vector(this.position.left, this.position.top)));
            if (!this.app.flag) {
                this.app.flag = true;
                this.app.run();
            }
            this.isDrag = false
        });
        
        window.addEventListener('mousemove', (e: MouseEvent) => {
            if(e.button === 2 || e.button === 1) {
                return;
            }
            if (this.isDrag) {
                context.strokeStyle = "#affe"
                context.lineWidth = 2;
                context.beginPath();
                context.moveTo(this.startX, this.startY);
                context.lineTo(e.offsetX, e.offsetY);
                context.closePath();
                context.stroke();
                
                this.position = {
                    top: this.position.top < e.offsetY ? this.position.top : e.offsetY,
                    bottom: this.position.bottom > e.offsetY ? this.position.bottom : e.offsetY,
                    left: this.position.left < e.offsetX ? this.position.left : e.offsetX,
                    right: this.position.right > e.offsetX ? this.position.right : e.offsetX,
                }

                this.startX = e.offsetX;
                this.startY = e.offsetY;
            }
        });

    }
}