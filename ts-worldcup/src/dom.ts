import setStyle from "./utils/setStyle";

type ElemProps = {
    parent?: HTMLElement;
    refName?: keyof {
        [key in keyof HTMLElementTagNameMap]?: string | null;
    };
    css?: {
        [key in keyof CSSStyleDeclaration]?: string | null;
    };
    id?: string | number;
};

function findElement(key: string) {
    return document.getElementById(key) as HTMLElement | null;
}

export default class Elem<T extends HTMLElement> {
    ref: HTMLElement | T;
    parent?: HTMLElement
    constructor({ parent, refName, css, id }: ElemProps) {
        const element = findElement(`${id}`);
        if (element !== null) {
            this.ref = element;
        } else {
            this.ref = document.createElement(refName || "div");
            this.ref.setAttribute("id", `${id || ""}`);
            if (parent !== null) {
                this.parent = parent;
                parent?.appendChild(this.ref);
            }
            if (css !== null) {
                setStyle(this.ref, css);
            }
        }
    }

    updateInnerTEXT(msg: string) {
        this.ref.innerText = msg;
    }

    setStyles(css: ElemProps['css']) {
        setStyle(this.ref, css);
    }

    addChild(childRef: HTMLElement) {
        this.ref.appendChild(childRef);
    }

    removeChild(childRef: HTMLElement) {
        this.ref.removeChild(childRef);
    }

}
