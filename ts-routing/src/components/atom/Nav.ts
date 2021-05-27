import { historyRouterPush } from 'src/router/router';
import { ElemConstructorType, path } from './../../type/type';
import Elem from "./Elem";


export default class NavComponent {
    $target: HTMLElement;
    $buttons: string[] = ['No.1', 'No.2', 'No.3'];
    constructor({ parent, refName = 'nav', className }: ElemConstructorType) {
        this.$target = new Elem({ parent, refName, className }).$target;
        this.$buttons.forEach((str, i) => {
            const btn = new Elem({ parent: this.$target, refName: 'button', className: 'btn' }).$target;
            btn.innerHTML = str;
            btn.addEventListener('click', () => {
                const path = `/${i + 1}` as path;
                historyRouterPush(path);
            });
        })
    }
}