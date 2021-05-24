import Login from 'src/components/Login';
import Elem from "src/components/atom/Elem";
import Card from "src/components/atom/Card";
import App from 'src/components/Main';

type path = '/' | '/1' | '/2' | '/3';

const APP = new App();
const APP_ELEMENT = APP.$target;

const routes = (pathName: path) => {
    switch (pathName) {
        case '/': return new Login({ parent: null, refName: 'section', className: 'login' }).render();
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
    if (route) APP_ELEMENT.appendChild(route);
}

export {
    initialRoutes,
    historyRouterPush,
}