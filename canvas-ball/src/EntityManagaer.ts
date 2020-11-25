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
        context.fillStyle = 'rgba(0, 0, 0, 0.05)';
        context.rect(0, 0, context.canvas.width, context.canvas.height);
        context.fill();

        for(let i = 0; i< this.enetities.length; i++) {
            this.enetities[i].render(context);
        }
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