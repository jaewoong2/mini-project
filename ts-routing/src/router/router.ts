import Elem from "src/components/atom/Elem";
import Card from "src/components/atom/Card";
import App from 'src/components/Main';
import NavComponent from 'src/components/atom/Nav';
import { path } from 'src/type/type';
import Loading from "src/components/atom/Loading";

const APP = new App();
const APP_ELEMENT = APP.$target;
const $Loading = new Loading();

const NAV = new NavComponent({ parent: null, refName: 'nav', className: 'nav' }).$target;
const routes = (pathName: path) => {
    switch (pathName) {
        case '/': return NAV;
        case '/1': return new Card({ parent: null, refName: 'section', className: 'card' }).render();
        case '/2': return new Card({ parent: null, refName: 'section', className: 'card' }).render();
        case '/3': return new Card({ parent: null, refName: 'section', className: 'card' }).render()
        default: return historyRouterPush('/');
    }

}

function initialRoutes() {
    const pathName = window.location.pathname as path;
    renderHTML(routes(pathName))
    window.onpopstate = () => renderHTML(routes(pathName))
}

function historyRouterPush(pathName: path) {
    window.history.pushState({}, pathName, window.location.origin + pathName)
    renderHTML(routes(pathName))
}

function renderHTML(route: HTMLElement | void) {
    APP_ELEMENT.innerHTML = '';
    APP_ELEMENT.appendChild(NAV);
    if (route) APP_ELEMENT.appendChild(route);
}

export {
    initialRoutes,
    historyRouterPush,
}