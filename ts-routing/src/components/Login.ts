import { historyRouterPush } from 'src/router/router';
import { request } from 'src/utils/api';
import { ElemConstructorType, API_TYPE } from './../type/type';
import Elem from "./atom/Elem";

export default class Login {
    $button: Elem;
    $target: HTMLElement;
    state: API_TYPE = {};
    constructor({ parent, refName, className }: ElemConstructorType) {
        this.$target = new Elem({ parent, refName, className }).$target;
        this.$button = new Elem({ parent: this.$target, className: 'button', refName: 'button' });
        this.$button.$target.addEventListener('click', this.onBtnClick);
        this.$button.$target.innerHTML = '발급 받기';
    }

    onBtnClick = async () => {
        const data = await request({ END_POINT: '1', key: 'a_data' });
        this.setState(data[0]);
    }

    setState(nextState: {}) {
        this.state = {
            ...this.state,
            ...nextState
        }

        this.render();
    }

    render() {
        if (this.state?.id) {
            historyRouterPush('/1');
        }
        return this.$target;
    }
}