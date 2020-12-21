import EntityManager from './EntityManagaer';
import Time from './Time';
import Circle from './Circle';
import Vector from './Vector';
import Entity from './Entity';
import Bar from './Bar';

export function sleep(ms: number = 500) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, (ms));
    })
}

export default class App {
    ref: HTMLElement;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D | null;
    handleRequestFrame: number | null = null;
    entityManager: EntityManager;
    width: number = window.innerWidth;
    heigth: number = window.innerWidth;

    constructor(ref: HTMLElement) {
        this.ref = ref;
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.heigth;

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
            // requestAnimationFrame 은 재귀적으로 반복호출됨 1초에 60번
        }
    }
}

window.addEventListener('load', () => {
    const app = new App(document.body);
    // document.body.style.background = "url(https://images.unsplash.com/photo-1502307444187-44d62a6a80af?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80)"
    
    const snowCreator = () => {
        const circle = new Circle(new Vector(app.canvas.width * Math.random(), 0));
        app.entityManager.addEntity(circle);
    }

    let time = 0;
    const interval = setInterval(() => {
        for(let i = 0; i < 5; i++) {
            snowCreator();
        }
        time++
        if(time > 50) { 
            clearInterval(interval)
        }
    },1000)

    app.entityManager.addEntity(new Bar(new Vector(app.canvas.width * 0.5, app.canvas.height * 0.5)))

    
    app.play();
    window.addEventListener('resize', () => {
        app.canvas.width = window.innerWidth;
        app.canvas.height = window.innerHeight;
    })
})

