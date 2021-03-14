type ElemProps = {
    parent: HTMLElement,
    ref: keyof {
        [key in keyof HTMLElementTagNameMap]?: string | null
    },
    css?: {
        [key in keyof CSSStyleDeclaration]?: string | null
    };
};

function settingCssProperty(ref: HTMLElement, cssProperty?: ElemProps["css"]) {
    if (cssProperty !== null && cssProperty !== undefined) {
        const keys = Object.keys(cssProperty);
        const values = Object.values(cssProperty);
        for (let i = 0; i < keys.length; i++) {
          const index = keys[i]
            .split("")
            .findIndex((value) => value.toLocaleLowerCase() !== value);
          if (index > -1) {
            const upperWord = keys[i][index];
            const key = keys[i].replace(
              upperWord,
              `-${upperWord.toLocaleLowerCase()}`
            );
            const value = values[i];
            if(value) {
                ref.style.setProperty(key, value);
            }
          } else {
            const value = values[i];
            if(value) {
                ref.style.setProperty(keys[i], value);
            }
          }
        }
      }
}

class Elem<K> {
    ref: HTMLElement;
    constructor({ parent, ref, css }: ElemProps) {
        this.ref = document.createElement(ref);
        parent.appendChild(this.ref)
        settingCssProperty(this.ref, css)
    }
}

function init() {
    const main = new Elem({
        parent: document.body,
        ref: 'main',
        css: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minWidth: "100vw",
            minHeight: "100vh"
        }
    }).ref

    const wrapper = new Elem({
        parent: main,
        ref: 'div',
    }).ref

    const span = new Elem({
        parent: wrapper,
        ref: 'span',
        css: {
            position: 'relative',
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }
    }).ref

    const input = new Elem({
        parent: span,
        ref: "input",
        css: {
            position: "relative",
            width: "120px",
            height: "1rem",
            padding: "10px",
            background: "rgba(0, 0, 0, 0)",
            zIndex: '2',
            color: "rgba(0, 0, 0, 0)",
        }
    }).ref as HTMLInputElement

    const lastword = new Elem({
        parent: span,
        ref: "span",
        css: {
            position: "absolute",
            overflow: "auto",
            height: "100%",
            left: "0",
            display: "flex",
            justifyContent: "center",
            paddingLeft: "10px",
            alignItems: "center",
            zIndex: "1",
            top: "0",
        }
    }).ref

    const afterWord = new Elem({
        parent: lastword,
        ref: "span",
        css: {
            position: "absolute",
            width: "1px",
            right: "0",
            height: "50%",
            background: "rgba(0, 0, 0, 0.95)"
        }
    }).ref

    let value = ""

    const onChangeValue = (e: Event) => {
        const eventTarget = e.target as HTMLInputElement;
        value = eventTarget.value
        let text = '';
        for (let i = 0; i < value.length - 1; i++) {
            text += "*"
        }
        input.value = value
        if (value.length > 0) {
            lastword.textContent = text + value[value.length - 1]
        } else {
            lastword.textContent = ""
        }
    }
    
    input.setAttribute('type', "password")
    input.setAttribute('value', value)
    input.onkeyup = onChangeValue
    

}

init()