import { historyRouterPush } from 'src/router/router';
import { ElemConstructorType, path } from './../../type/type';
import Elem from "./Elem";


export default class Loading {
    $target: HTMLElement;
    isLoading: boolean = false;
    constructor() {
        this.$target = document.querySelector('.loading') || new Elem({ parent: document.body, refName: 'div', className: 'hide loading' }).$target;
        this.$target.innerHTML = '로딩중..'
    }


    setLoading(value: boolean) {
        this.isLoading = value;
        this.$target.className = this.isLoading ? 'loading' : 'hide loading';
    }
}