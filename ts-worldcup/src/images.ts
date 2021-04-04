import Elem from './dom';
import './styles.css';
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
    maxWidth: `100%`,
    maxHeight: `100%`,
    opacity: `1`,
};

export class Image_ {
    static len: number;
    static images: { src: string; key: string | number }[] = [];
    static flag = false;
    static selected: { src: string; key: string | number }[] = [];
    private isClick: boolean = false;
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
            if (!this.isClick) {
                Image_.selected.push({ src: this.src, key: Image_.selected.length || 0 });
                ImageController.update(this.key);
            }
        });
    }

    private setAttributeSrc(key?: number) {
        if (typeof key === 'number') {
            this.src = Image_.images[key].src;
            this.ref.setAttribute("src", this.src);
            this.ref.setAttribute("alt", `${this.key} `);
        } else {
            if (this.key === key) {
                this?.elem?.parent?.classList.add('clicked');
            } else {
                this?.elem?.parent?.classList.add('not-clicked', 'blank');
            }
        }
    }

    async click(key?: number) {
        this.isClick = true;
        if (typeof key === 'number') {
            if (key === this.key) {
                this?.elem?.parent?.classList.add('clicked');
                await sleep(1000);
                this?.elem?.parent?.classList.replace('clicked', 'blank');
            } else {
                this?.elem?.parent?.classList.add('not-clicked');
                await sleep(1000);
                this?.elem?.parent?.classList.replace('not-clicked', 'blank');
            }
            await sleep(100);
        }
        this.isClick = false;
    }

    async update() {
        const rankElem = new Elem({ id: 'rank' });
        rankElem.ref.classList.remove('change-rank');
        rankElem.updateInnerTEXT(`${Image_.len === 2 ? '결승' : Image_.len === 4 ? '준결승' : Image_.len + `강`} `);

        if (Image_.len == 1) {
            rankElem.ref.classList.add('change-rank');
            rankElem.updateInnerTEXT(`우승`);
            this.setAttributeSrc();
            this.isClick = true;
            return;
        }

        if (Image_.selected.length * 2 >= Image_.len || Image_.flag) {
            rankElem.ref.classList.add('change-rank');
            this.key = this.key % 2 ? 1 : 0;
            if (!Image_.flag) {
                Image_.len = Image_.len / 2;
                Image_.images = [...Image_.selected];
                Image_.selected = [];
                Image_.flag = true;
            } else {
                Image_.flag = false;
            }
            this.setAttributeSrc(this.key);
        } else {
            this.key = this.key + 2;
            this.setAttributeSrc(this.key);
        }
    }
}

export class ImageController {
    static images_: Image_[] = [];

    constructor() { }

    static update(key?: number) {
        ImageController.images_.forEach(async (image_) => {
            await image_.click(key);
            image_.elem.parent?.classList.remove('blank');
            image_.update();
        });
    }
}
