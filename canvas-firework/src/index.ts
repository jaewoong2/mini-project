import EntityManager from "./EntityManager";
import FireWork from "./FireWork";
import Time from "./Time";
import Vector from "./Vector";

// 출처 : https://velog.io/@kimbyungchan/canvas-fireworks
// 보면서 공부 했습니다.

class App {
    ref: HTMLElement;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D | null;
    handleRequestFrame: number | null = null;
    entityManager: EntityManager;

    constructor(ref: HTMLElement) {
        this.ref = ref;
        this.canvas = document.createElement('canvas');
        this.canvas.width = window.innerWidth * 0.9966;
        this.canvas.height = window.innerHeight * 0.9965;

        this.context = this.canvas.getContext('2d');
        this.entityManager = new EntityManager();
        this.ref.appendChild(this.canvas);
    
    }
        play = () => {
            Time.start();
            this.handleRequestFrame = window.requestAnimationFrame(this.onEnterFrame);
        }
        pause = () => {
            if(this.handleRequestFrame === null) return;
            window.cancelAnimationFrame(this.handleRequestFrame);
        }

        onEnterFrame = () => {
            Time.update();
            this.entityManager.update();
            if(this.context !== null) {
                this.entityManager.render(this.context);
                this.handleRequestFrame = window.requestAnimationFrame(this.onEnterFrame);
            }
        }
    } 

window.addEventListener('load', () => {
    const app = new App(document.body);

    function createFirework() {
        const firework = new FireWork(
        new Vector(app.canvas.width * Math.random(), app.canvas.height)
        );

        app.entityManager.addEntity(firework);
    }

    createFirework();
    setInterval(() => {
        createFirework();
    }, 600);

    app.play();
});