import { DH_UNABLE_TO_CHECK_GENERATOR } from 'constants';
import Elem from './dom';

type GraphType = { [k in number | string ]?: number[] }
function sleep(ms: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, ms);
    })
}

function createGraphNodeElems(graph: GraphType) {
    const graphSection = document?.body?.querySelector(`#graph-section`) as HTMLElement;

    for(let key in graph) {
        if (!document?.getElementById(`${key}`)) {
            if (graphSection) {
                new Elem({
                    parent: graphSection,
                    refName: 'div',
                    css: {
                        position: `relative`,
                        width: `32px`,
                        height: `auto`,
                        borderRadius: `50%`,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        border: `1px solid black`,
                    },
                    id: key
                }).ref.innerText = key
            }
        }
    }
}

async function dfs(graph: GraphType, start: number) {
    const stack: { number: number, level: number }[] = [{ number: start, level: 1 }];
    const visited: number[] = [start];
    while (stack.length) {
        const obj = stack.pop();
        const { number: v, level } = obj ? obj : { number: start, level: 1 };
        const nextNode = v && graph[v];
        const elem = new Elem({ id: v });
        elem.active();
        if (nextNode) {
            nextNode.sort((a, b) => b - a);
            for(let i = 0; i < nextNode.length; i++) {
                if(!visited.includes(nextNode[i])) {
                    stack.push({ number: nextNode[i], level: level + 1 })
                    visited.push(nextNode[i])
                    const childElem = new Elem({ id: nextNode[i] });
                    elem.addChild(childElem.ref, level + 1);
                }
            }
        }
        // await sleep(1000);
        elem.inActive();
    }
}

function getGraph(graph: string): GraphType {
    let arr: number[][] = [];
    let temp: number[] = [];
    graph.split(',').forEach(node => {
        for(let i = 0; i < node.length; i++) {
            if (parseInt(node[i])) {
                temp.push(+node[i]);
            }
        }
        if (temp.length == 2) {
            arr.push(temp);
            temp = [];
        }
    });

    let graph_: GraphType = {};

    for(let i = 0; i < arr.length; i++) {
        const parent = arr[i][0];
        const child = arr[i][1]
        graph_[parent] = [];
        graph_[child] = [];
    }
    
    for(let i = 0; i < arr.length; i++) {
        const parent = arr[i][0];
        const child = arr[i][1]

        graph_[parent]?.push(child);
    }
    return graph_;
}

function init() {
    const main = new Elem({
        parent: document.body,
        refName: "main",
        css: {
            minWidth: '100vw',
            minHeight: '100vH',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }
    });

    new Elem({
        parent: main.ref,
        refName: "section",
        css: {
            width: `40%`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        },
        id: 'graph-section',
    });
    const graph = getGraph(`[[1, 2], [1, 3], [2, 4], [2, 5], [3, 6], [3, 7], [4, 8], [6, 9]]`);
    createGraphNodeElems(graph);
    dfs(graph, 1);
}

window.onload = init;