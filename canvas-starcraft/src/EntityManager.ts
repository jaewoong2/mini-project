import Entity from "./Entity";

export default class EntityManager {
    static instance: EntityManager;

    static addEntity(entity: Entity) {
        EntityManager.instance.addEntity(entity);
    }
    static removeEntity(entity: Entity) {
        EntityManager.instance.removeEntity(entity);
    }

    constructor() {
        EntityManager.instance = this;
    }

    entities: Entity[] = [];

    update() {
        for(let i = 0; i < this.entities.length; i++) {
            this.entities[i].update();
        }
    }

    render(context: CanvasRenderingContext2D) {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        // context를 클리어 해줘야 원이 움직이는 것 처럼 그려짐
        // 클리어 해주지 않으면 선이 그어짐. 
        // context.beginPath();
        // context.fillStyle = 'rgba(0, 0, 0, 0)';
        // context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        // context.fill();

        for(let i = 0; i < this.entities.length; i++) {
            this.entities[i].render(context);
        }
    }

    addEntity(entity: Entity) {
        this.entities.push(entity);
    }

    removeEntity(entity: Entity) {
        const entityIndex = this.entities.indexOf(entity);
        if(entityIndex > -1) { // 엔티티가 있으면
            this.entities.splice(entityIndex, 1);
        }
    }
}