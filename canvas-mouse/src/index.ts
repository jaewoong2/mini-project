import Circle from "./Circle";
import Shape from "./Shape";
import Vector from "./Vector";

// 출처 : https://velog.io/@kimbyungchan/canvas-mouse-interaction
// 보면서 공부 했습니다.

export default class App {
    static instance: App;

    width: number = window.innerWidth;
    height: number = window.innerHeight;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D | null;
    delta: number = 0;
    startTime: number;
    frameRequestHandle: number;
    shapes: Array<Shape> = [];
    mousePosition: Vector = new Vector(0, 0);


    constructor() {
        App.instance = this;
        // 복사 instance

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.addEventListener('mousemove', this.onMouseMove)

        this.context = this.canvas.getContext('2d');
        // this.context = this.canvas.getContext('2d')!;
        // 여기 느낌표는 왜 넣는거지...
        this.startTime = Date.now();
        this.frameRequestHandle = window.requestAnimationFrame(this.frameRequest);

        const column = 10;
        const row = 10;

        window.addEventListener('resize', () => {
            this.width= window.innerWidth;
            this.height= window.innerHeight;
            this.canvas.width = this.width;
            this.canvas.height = this.height;
        })

        const columnWidth = this.width / column;
        const columnHeight = this.height / row;       

        for (let y = 0; y < row; y++) {
            for (let x = 0; x < column; x++) {
              const position = new Vector(columnWidth * x + columnWidth * 0.5, columnHeight * y + columnHeight * 0.5);
              this.shapes.push(new Circle(position));
            }
          }
      
     document.body.appendChild(this.canvas);

    }

    onMouseMove = (e : MouseEvent) => {
        this.mousePosition = new Vector(e.clientX, e.clientY);
    }

    frameRequest = () => {
        this.frameRequestHandle = window.requestAnimationFrame(this.frameRequest);
        // 함수내에서 재귀 콜백을함.
    
        const currentTime = Date.now(); // 함수 실행 시간
        // startTime 
        // 1. 처음에는 홈페이지가 실행되면서 시작
        // 2. 다음부터는 지금 함수 실행 시점으로
        // 즉, currentTime보다 startTime이 항상 앞선다.
        // 이렇게 한 이유는 앱 구동 만큼 시간을 주려고..?
        this.delta = (currentTime - this.startTime) * 0.001;
        this.startTime = currentTime;

        this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for(let i = 0; i< this.shapes.length; i++) {
            this.shapes[i].update(this.delta);
            // shapes[i] 에는 Circle이 들어있음.
            // 즉 Circle.update(this.delta);
            if(this.context !== null) {
                this.shapes[i].render(this.context);
            }
        }
      }    
}

window.addEventListener('load', () => {
    new App();
});

