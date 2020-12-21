type styleType = {
    [key in keyof CSSStyleDeclaration]?: string | null;
};

function sleep(ms: number = 500) {
    return new Promise<void>(resolve => {
        setTimeout(() => {
            resolve();
        }, (ms));
    })
}

function settingCssProperty(ref: HTMLElement, cssProperty?: styleType) {
    if (cssProperty !== null && cssProperty !== undefined) {
        const keys = Object.keys(cssProperty);
        const values = Object.values(cssProperty);
        for (let i = 0; i < keys.length; i++) {
          const index = keys[i]
            .split("")
            .findIndex((value) => value.toLocaleLowerCase() !== value);
          if (index > -1) {
            const upperWord = keys[i][index];
            const key = keys[i].replace(
              upperWord,
              `-${upperWord.toLocaleLowerCase()}`
            );
            const value = values[i];
            if(value) {
                ref.style.setProperty(key, value);
            }
          } else {
            const value = values[i];
            if(value) {
                ref.style.setProperty(keys[i], value);
            }
          }
        }
      }
}

class NewElement {
    element: HTMLElement;
    constructor(elem: keyof HTMLElementTagNameMap) {
        this.element = document.createElement(elem);
    }
}

class CircleElement extends NewElement{    
    constructor(elem: keyof HTMLElementTagNameMap = "div") {
        super(elem);
    }

    create(ref: HTMLElement, styleOptions: styleType) {
        settingCssProperty(this.element, styleOptions);
        ref.appendChild(this.element);

        return this.element;
    }
}

class CircleCanvas {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D | null;
    width: number;
    heigth: number;
    ref: HTMLElement;
    radius: number;
    position: {x: number, y: number};

    ARCfrom: number = (1.5 * Math.PI);
    addedWidth: number = 20;

    constructor(ref: HTMLElement) {
        this.ref = ref;
        const clinetRect = this.ref.getBoundingClientRect();
        this.width = clinetRect.width;
        this.heigth = clinetRect.height;
        this.position = {
            x: (this.width / 2) + this.addedWidth / 2,
            y: (this.heigth / 2) + this.addedWidth / 2,
        }
        this.radius = this.width / 2;

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width + this.addedWidth;
        this.canvas.height = this.heigth + this.addedWidth;
        this.canvas.style.position = "absolute";

        this.context = this.canvas.getContext('2d');
        this.ref.appendChild(this.canvas);
    }

    create() {        
        return this.canvas;
    }

    update(to: number) {
        this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if(this.context) {
            this.context?.beginPath();
            this.context.lineCap = "round";
            this.context.strokeStyle = "rgba(250, 50, 44)";
            this.context.lineWidth = 5.5;
            this.context?.arc(this.position.x, this.position.y, this.radius, this.ARCfrom, (1.5 + to / 50) * Math.PI);
            this.context?.stroke();
        }
    }
}

const createElement = async () => {
    const parentStyleOptions: styleType = {
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    }
    const parentElement = new CircleElement().create(document.body, parentStyleOptions);

    const styleOptions: styleType = {
        width: "150px",
        height: "150px",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        backgroundColor: "white"
    }
    const circleElement = new CircleElement().create(parentElement, styleOptions);

    const circleLine = new CircleCanvas(circleElement);
    circleLine.create();
    
    /** update / 10ms */
    const per = 75;
    for(let i = 0; i <= per; i++ ) {
        await sleep(10);
        circleLine.update(i);
    }
    
    /** 숫자 표시 */
    const span = new NewElement("span").element;
    span.innerText = `${per}%`;
    circleElement.appendChild(span);
}

createElement();