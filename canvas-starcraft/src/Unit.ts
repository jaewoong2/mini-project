import Entity from "./Entity";
import EntityManager from "./EntityManager";
import Time from "./Time";
import Vector from "./Vector";

function drawEllipse(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
) {
    // Ellipse 는 타원
    const kappa = 0.5522848;
    const ox = (width / 2) * kappa; // x offset for the control point
    const oy = (height / 2) * kappa; // y offset for the control point
    const xe = x + width; // 타원의 x좌표 끝값 (x end)
    const ye = y + height; // 타원의 y좌표 끝 값 (y end)
    const xm = x + width / 2; //  타원의 x 좌표 중심 (x middle)
    const ym = y + height /2; // 타원의 y 좌표 중심 (y middle)
    context.beginPath();
    context.moveTo(x, ym);
    context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
    context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
    context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
    context.closePath();
    context.stroke();
} 

export default class Unit extends Entity {
    radius: number;
    sepeed: number;
    movement: boolean = false;
    isSelected: boolean = true;
    targetPosition: Vector = new Vector(0, 0);

    constructor(position: Vector) {
        super(position);

        this.radius = 15;
        this.sepeed = 100;
    }

    update() {
        const units = EntityManager.instance.entities.filter((entity) => entity instanceof Unit) as Unit[];

        for(let i = 0; i < units.length; i++) {
            const unit = units[i];
            if(this !== unit) {
                const distance = this.position.distance(unit.position);
                const length = this.radius + unit.radius;
                if (distance <= length) {
                  const force = length - distance;
                  const angle = this.position.angleBetween(unit.position);
        
                  this.position.x -= Math.cos(angle) * force;
                  this.position.y -= Math.sin(angle) * force;
                }
            }
        }

        if(this.movement) {
            const angle = this.position.angleBetween(this.targetPosition);
            this.position.x += Math.cos(angle) * this.sepeed * Time.delta;
            this.position.y += Math.sin(angle) * this.sepeed * Time.delta;
            // 1px 만큼 차이가 나기전까지는
            // 계속해서 x, y의 값을 speed값 과 delta 값에 따라 움직인다
            // 1px만큼 거리가 되면 움직임을 멈춘다


            if(this.position.distance(this.targetPosition) <= 1) {
                this.movement = false;
            }
        }
    }

    render(context: CanvasRenderingContext2D) {
        if(this.isSelected) {
            context.beginPath();
            context.lineWidth = 2;
            context.strokeStyle = "#0f0";
            drawEllipse(
                context,
                this.position.x - this.radius,
                this.position.y + this.radius * 0.75,
                this.radius * 2,
                this.radius * 0.75
            );
        }

        context.beginPath();
        context.fillStyle = "#000";
        context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        context.fill();
    }
}
    