import { API_TYPE } from './../type/type';
import Elem from "./atom/Elem";

const initialState: {
    data?: API_TYPE,
} = {
    data: {},
}

export default class App {
    $target: HTMLElement = document.getElementById('app') as HTMLElement;
    state = initialState;
    constructor() { };

    render() {

        return this.$target;
    }

    setState(data: typeof initialState) {
        this.state = {
            ...this.state,
            ...data
        }

        this.render();
    }
}