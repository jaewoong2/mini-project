import Circle from "./Circle";
import Shape from "./Shape";
import Vector from "./Vector";

// 출처 : https://velog.io/@kimbyungchan/canvas-animation
// 보면서 공부 했습니다.

class App {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D | null;
    delta: number = 0;
    startTime: number;
    frameRequestHandle: number;
    shapes: Array<Shape> = [];

    constructor() {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        // this.context = this.canvas.getContext('2d')!;
        // 여기 느낌표는 왜 넣는거지...
        this.startTime = Date.now();
        this.frameRequestHandle = window.requestAnimationFrame(this.frameRequest);
        this.canvas.width = 500;
        this.canvas.height = 500;

        
        document.body.appendChild(this.canvas);

        for (let i = 0; i < 100; i++) {
            this.shapes.push(
              new Circle(new Vector(this.canvas.width * 0.5, this.canvas.height * 0.5))            
          )
     }
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