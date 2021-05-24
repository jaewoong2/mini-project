import { ElemConstructorType } from "src/type/type";

export default class Elem {
    $target: HTMLElement;
    domId: number = Elem.id;
    static id: number = 0;
    constructor({ parent, className, refName }: ElemConstructorType) {
        this.$target = document.createElement(refName);
        this?.$target?.setAttribute('class', className || "");
        parent?.appendChild(this.$target);
        this.domId = Elem.id;
        this.$target.id = `${this.domId}`;
        Elem.id += 1;
    }

}