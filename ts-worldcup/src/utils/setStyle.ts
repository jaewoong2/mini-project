 type CssPropertyType = {
        [key in keyof CSSStyleDeclaration]?: string | null
    };

export default function (ref: HTMLElement, cssProperty?: CssPropertyType) {
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