import App from "src";
import Entity from "./Entity";
import Vector from "./Vector";

export default class DragArea extends Entity {
    constructor(position: Vector) {
        super(position);
    }

    update() {
        this.position = App.instance.mouseDownPosition;
    }

    render(context: CanvasRenderingContext2D) {
        if(!App.instance.isPressed) return;
        
        context.beginPath();
        context.strokeStyle = "#00ff00";
        context.lineWidth = 2;
        context.rect(this.position.x, this.position.y, App.instance.mousePosition.x - this.position.x, App.instance.mousePosition.y - this.position.y);
        // 마우스를 눌렀을 때 위치
        // this.position
        // 마우스를 움직이면서 갱신되는 위치
        // App.instance.mousePosition
        context.stroke();
    };
}