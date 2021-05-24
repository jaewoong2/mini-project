import { ElemConstructorType } from "src/type/type";
import Elem from "./Elem";

interface ImgComponentConstructorType extends ElemConstructorType {
    imgSrc?: string;
}

export default class ImgComponent {
    $target: HTMLElement;
    constructor({ parent, refName = 'img', className, imgSrc = '' }: ImgComponentConstructorType) {
        this.$target = new Elem({ parent, refName, className }).$target;
        this.$target.setAttribute('src', imgSrc);
    }


    setSrc(imgSrc: string) {
        this.$target.setAttribute('src', imgSrc);
    }
}