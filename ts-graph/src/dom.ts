import setStyle from "./utils/setStyle";

type ElemProps = {
    parent?: HTMLElement,
    refName?: keyof {
        [key in keyof HTMLElementTagNameMap]?: string | null
    },
    css?: {
        [key in keyof CSSStyleDeclaration]?: string | null
    };
    id?: string | number,
};

export default class Elem {
    ref: HTMLElement;
    constructor({ parent, refName, css, id }: ElemProps) {
        if(document.getElementById(`${id}`) !== null) {
            this.ref = document.getElementById(`${id}`) || document.createElement(refName || 'div');
        } else {
            this.ref = document.createElement(refName || 'div');
            this.ref.classList.add('inactive');
            this.ref.setAttribute('id', `${id || ''}`);
        }
        if (parent !== null) {
            parent?.appendChild(this.ref);
        }
        if (css !== null) {
            setStyle(this.ref, css);
        }
    }

    addChild(childRef: HTMLElement) {
        this.ref.appendChild(childRef);
    }

    removeChild(childRef: HTMLElement) {
        this.ref.removeChild(childRef);
    }

    active() {
        this.ref.className = 'active';
        setStyle(this.ref, {
            borderColor: 'rgba(255, 100, 100, 0.95)',
        });
    }

    inActive() {
        this.ref.className = 'inactive';
        setStyle(this.ref, {
            borderColor: 'rgba(100, 100, 100, 0.95)',
        });
    }
}