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
                        width: `32px`,
                        height: `32px`,
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
    const stack: number[] = [start];
    const visited: number[] = [start];
    while (stack.length) {
        const v = stack.pop();
        const nextNode = v && graph[v];
        new Elem({ id: v }).active();
        if (nextNode) {
            for(let i = 0; i < nextNode.length; i++) {
                if(!visited.includes(nextNode[i])) {
                    stack.push(nextNode[i])
                    visited.push(nextNode[i])
                }
            }
        }
        await sleep(3000);
        new Elem({ id: v }).inActive();
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

        if(graph_[parent]?.length) {
            graph_[parent]?.push(child);
        } else {
            graph_[parent] = [child];
        }

        if(graph_[child]?.length) {
            graph_[child]?.push(parent);
        } else {
            graph_[child] = [parent];
        }
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

    const graphInput = new Elem({
        parent: main.ref,
        refName: 'input',
        css: {
            outline: 'none',
            border: `1px solid black`,
            borderRadius: `8px`,
        }
    });

    new Elem({
        parent: main.ref,
        refName: "section",
        css: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        },
        id: 'graph-section',
    });
    graphInput.ref.setAttribute('placeholder', "ex) [[1, 2], [2, 3], [2, 4]]")
    const graph = getGraph(`[[1, 2], [2, 3], [2, 4], [3, 5], [5, 8]]`);
    createGraphNodeElems(graph);
    dfs(graph, 1);
}

window.onload = init;