import Entities from './Entities';
import Line from './line';
import Time from './Time';

export default class App {
    ref: HTMLElement;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D | null;
    width: number = window.innerWidth;
    handleRequestFrame: number | null = null;
    entities: Entities;
    height: number = window.innerWidth;
    flag: boolean = false;

    constructor(ref: HTMLElement) {
        this.ref = ref;
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width * 0.9966;
        this.canvas.height = this.height * 0.9965;
        this.context = this.canvas.getContext('2d');
        this.ref.appendChild(this.canvas);
        this.entities = new Entities();
        if (this.context) {
            new Line(this).run(this.context);
        }
    }

    run = () => {
        Time.start();
        this.handleRequestFrame = window.requestAnimationFrame(this.onEnterFrame);
    }

    onEnterFrame = () => {
        Time.update();
        this.entities?.update();
        if(this.context !== null) {
            this.entities?.render(this.context);
            window.requestAnimationFrame(this.onEnterFrame);
            // requestAnimationFrame 은 재귀적으로 반복호출됨 1초에 60번
        }
    }

    update() {
        const imageData = this.canvas.toDataURL();
        this.canvas.width = window.innerWidth * 0.9966;
        this.canvas.height = window.innerHeight * 0.9965;
        const img_ = new Image();
        img_.onload = () => {
            this.context?.drawImage(img_, 0, 0);
        }
        img_.src = imageData;
    }
}

window.addEventListener('load', () => {
    const app = new App(document.body);
    document.body.style.background = 'rgba(0, 0, 0, 255)';
    
    window.addEventListener('resize', () => {
        app.update();
    })
    
})

