'use strict';

/**
 * @param {string} tagName
 * @param {object} [props]
 * @param {string[]} [props.classes]
 * @param {string[]} [props.ids]
 * @param {object} [props.styles]
 * @param {string} [props.html]
 * @return {string}
 */
const generate = (tagName, props) => {
    let __output = ``;

    if (!tagName || typeof tagName !== 'string') {
        return console.error(`[@tagName] -> not found or not a string!`);
    }

    __output += `<${tagName}`;

    if (props) {
        /* Classes */
        if (props['classes']) {
            if (Array.isArray(props['classes'])) {
                __output += ` class="`;

                props['classes'].forEach(__class => {
                    __output += `${__class} `;
                });

                __output = __output.split("");
                __output[__output.length - 1] = '"';
                __output = __output.join("");
            } else {
                console.error(`[@class] -> not array!`);
            }
        }

        /* Ids */
        if (props['ids']) {
            if (Array.isArray(props['ids'])) {
                __output += ` id="`;

                props['ids'].forEach(__id => {
                    __output += `${__id} `;
                });

                __output = __output.split("");
                __output[__output.length - 1] = '"';
                __output = __output.join("");
            } else {
                console.error(`[@ids] -> not array!`);
            }
        }

        /* Styles */
        if (props['styles']) {
            if (typeof props['styles'] === 'object' && !Array.isArray(props['styles'])) {
                const
                    _keys = Object.keys(props['styles']),
                    _values = Object.values(props['styles']);

                __output += ` style="`;

                _keys.forEach((__style, __index) => {
                    __output += `${__style}: ${_values[__index]}; `;
                });

                __output = __output.split("");
                __output[__output.length - 1] = '"';
                __output = __output.join("");
            }
        }

        __output += ` x-created-by="x-render-js">`;

        if (props['textContent']) {
            __output += String(props['textContent']);
        }

        /* Content */
        if (props['html']) {
            if (!['b', 'big', 'i', 'small', 'abbr', 'tt', 'acronym', 'cite', 'code', 'dfn', 'em', 'kbd', 'strong', 'samp', 'time', 'var', 'a', 'bdo', 'br', 'img', 'map', 'object', 'q', 'script', 'span', 'sub', 'sup', 'button', 'input', 'label', 'select', 'textarea'].includes(tagName)) {
                __output += String(props['html']);
            } else {
                console.log(`[@${tagName}] -> doesn't provide 'html' property!`);
            }
        }

        if (!['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'].includes(tagName)) {
            __output += `</${tagName}>`;
        }
    }

    return __output;
}

const _ = generate;

export {_ as generate};