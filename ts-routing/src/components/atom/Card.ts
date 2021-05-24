import { API_TYPE } from './../../type/type';
import { getLocalStorage, request } from '../../utils/api';
import { ElemConstructorType, POST_TYPE } from "src/type/type";
import Elem from "./Elem";
import ImgComponent from "./Img";


export default class Card {
    $image: ImgComponent;
    $name: Elem;
    $target: HTMLElement;
    $postContainer: HTMLElement;
    state: API_TYPE = {};
    domId: string;
    isDataLoaded: boolean = false;
    constructor({ parent, refName, className }: ElemConstructorType) {
        this.$target = new Elem({ parent, refName, className }).$target;
        this.domId = this.$target.id;
        this.$image = new ImgComponent({ parent: this.$target, refName: 'img', className: 'profile-img', imgSrc: "" });
        this.$name = new Elem({ parent: this.$target, refName: 'div', className: 'name' });
        this.$postContainer = new Elem({ parent: this.$target, refName: 'table', className: 'table' }).$target;
    }

    setState(nextState: {}) {
        this.state = {
            ...this.state,
            ...nextState
        }

        this.render();
    }

    render() {
        this.init();
        this.$image.setSrc(this.state?.profile?.image || '');
        this.$name.$target.innerHTML = this?.state?.profile?.name || '';
        this.$postContainer.innerHTML = '';
        this.state?.posts?.forEach((post, idx) => {
            const $tr = new Elem({ parent: this.$postContainer, refName: 'tr', className: `tr ${idx}` }).$target;
            for (let key in post) {
                const $td = new Elem({ parent: $tr, refName: 'td', className: `td ${key}` }).$target;
                const key_ = key as keyof POST_TYPE
                $td.innerHTML = post[key_] as string;
            }
        })

        return this.$target;
    }


    async init() {
        if (!this.isDataLoaded) {
            const data = await request({ END_POINT: location.pathname, key: location.pathname });
            this.setState({ ...data[0] });
            this.isDataLoaded = true;
        };
    }
}