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
    private left?: string;
    private right?: string;
    private level: number = 0;
    private static levels: { [k in number | string ]: number } = {};
    constructor({ parent, refName, css, id }: ElemProps) {
        if(document.getElementById(`${id}`) !== null) {
            this.ref = document.getElementById(`${id}`) || document.createElement(refName || 'div');
            
        } else {
            this.ref = document.createElement(refName || 'div');
            this.ref.classList.add('inactive');
            this.ref.setAttribute('id', `${id || ''}`);
            if (parent !== null) {
                parent?.appendChild(this.ref);
            }
            if (css !== null) {
                setStyle(this.ref, css);
            }
        }
    }

    private setLevel(level: number) {
        this.level = level;
        if (Elem.levels[level] > 0) {
            Elem.levels[level] += 10;
        } else {
            Elem.levels[level] = 10;
        }

        setStyle(this.ref, {
            position: `absolute`,
            top: `${(this.level * 30)}px`
        })
    }

    addChild(childRef: HTMLElement, level: number) {
        this.setLevel(level)
        this.ref.appendChild(childRef);
        if(this.left) {
            this.right = childRef.id;
            setStyle(this.ref, {
                left: `${Elem.levels[this.level]}%`,
            });
        } else {
            this.left = childRef.id;
            setStyle(this.ref, {
                right: `${Elem.levels[this.level]}%`
            });
        }
    }

    removeChild(childRef: HTMLElement) {
        this.ref.removeChild(childRef);
    }

    active() {
        this.ref.className = 'active';
        setStyle(this.ref, {
            borderColor: 'rgba(255, 100, 100, 0.95)',
            color: 'rgba(255, 100, 100, 0.95)',
        });
    }

    inActive() {
        this.ref.className = 'inactive';
        setStyle(this.ref, {
            borderColor: 'rgba(100, 100, 100, 0.75)',
            color: 'rgba(100, 100, 100, 0.75)',
        });
    }
}