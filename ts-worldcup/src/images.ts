import Elem from "./dom";
import setStyle from "./utils/setStyle";

function sleep(ms: number = 2000) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true);
        }, (ms));
    })
}

const imageStyle: { [key in keyof CSSStyleDeclaration]?: string | null } = {
    width: `auto`,
    height: `auto`,
    maxHeight: `400px`,
    opacity: `1`,
};

export class Image_ {
    static len: number;
    static images: { src: string; key: string | number }[] = [];
    static flag = false;
    static selected: { src: string; key: string | number }[] = [];
    src: string;
    key: number;
    ref: HTMLImageElement | HTMLElement;
    elem: Elem<HTMLImageElement>;

    constructor({
        src,
        key,
        parent,
    }: {
        src?: string;
        key?: number;
        parent: HTMLElement;
    }) {
        this.elem = new Elem<HTMLImageElement>({
            refName: "img",
            id: key,
            parent,
            css: imageStyle,
        });
        this.ref = this.elem.ref;
        this.src = src || "";
        this.key = key || -1;
        this.ref.addEventListener("click", async () => {
            Image_.selected.push({ src: this.src, key: Image_.selected.length || 0 });
            ImageController.update();
        });
    }

    update() {
        const rankElem = new Elem({ id: 'rank' });
        rankElem.updateInnerTEXT(`${Image_.len === 1 ? '결승' : Image_.len === 2 ? '준결승' : Image_.len + `강`} `);
        if (Image_.len == 1) {
            rankElem.updateInnerTEXT(`우승`);
            this.key = 0;
            this.src = Image_.images[this.key].src;
            this.ref.setAttribute("src", this.src);
            this.ref.setAttribute("alt", `${this.key} `);
            return;
        }

        if (Image_.selected.length * 2 >= Image_.len || Image_.flag) {
            this.key = this.key % 2 ? 1 : 0;
            if (!Image_.flag) {
                Image_.len = Image_.len / 2;
                Image_.images = [...Image_.selected];
                Image_.selected = [];
                Image_.flag = true;
            } else {
                Image_.flag = false;
            }
            this.src = Image_.images[this.key]?.src;
            this.ref.setAttribute("src", this.src);
            this.ref.setAttribute("alt", `${this.key} `);

        } else {
            this.key = this.key + 2;
            this.src = Image_.images[this.key].src;
            this.ref.setAttribute("src", this.src);
            this.ref.setAttribute("alt", `${this.key} `);
        }
    }
}

export class ImageController {
    static images_: Image_[] = [];

    constructor() { }

    static update() {
        ImageController.images_.forEach((image_) => {
            image_.update();
        });
    }
}
