import Bar from "./Bar";
import Circle from "./Circle";
import Entity from "./Entity";
import { sleep } from './index';

export default class EntityManager {
    constructor() {}
    enetities: Entity[] = [];

    update() {
        for(let i = 0; i< this.enetities.length; i++) {
            this.enetities[i].update();
        }
    }

    render(context: CanvasRenderingContext2D) {
        // context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context.beginPath();
        context.fillStyle = 'rgba(40, 40, 40, 0.9)';
        context.rect(0, 0, window.innerWidth, window.innerHeight);
        context.fill();

        for(let i = 0; i< this.enetities.length; i++) {
            this.enetities[i].render(context);
        }
    
        const snows = this.enetities.filter((entity : Entity) => entity instanceof Circle) as Circle[];
        const bar = this.enetities.filter((entity :Entity) => entity instanceof Bar)[0] as Bar;


        snows.forEach(async (snow) => {
            if(snow.position.y > bar.y && snow.position.y < bar.position.y) {
                if(snow.position.x < bar.x + 5 && bar.x - 5 < snow.position.x) {
                    this.removeEntity(snow);
                }
            } 
            if(snow.isFloor) {
                for(let i = 9; i > 0; i--) {
                    await sleep(100);
                    snow.color = `rgba(255, 255, 255, 0.${i}`
                }
                this.removeEntity(snow)
            }
        })
    }
    
    addEntity(entity: Entity) {
        this.enetities.push(entity)
    }

    removeEntity(entity: Entity) {
        const entityIndex = this.enetities.indexOf(entity);
        if(entityIndex > -1) {
            this.enetities.splice(entityIndex, 1);
        }
    }


}