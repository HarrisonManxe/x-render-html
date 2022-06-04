'use strict';

/* HTML5 Tags */
const HTML5Tags = [
    'a', 'abbr', 'acronym', 'adress', 'applet', 'area',
    'article', 'aside', 'audio', 'b', 'basefont', 'bdi',
    'bdo', 'bgsound', 'blockquote', 'big', 'body', 'blink',
    'button', 'canvas', 'caption', 'center', 'cite', 'code',
    'col', 'colgroup', 'command', 'comment', 'datalist',
    'dd', 'del', 'details', 'dfn', 'dir', 'div', 'dl', 'dt',
    'em', 'embed', 'fieldset', 'figcaption', 'figure', 'font',
    'form', 'footer', 'iframe', 'frameset', 'h1', 'h2', 'h3',
    'h4', 'h5', 'h6', 'header', 'hgroup', 'html', 'i', 'iframe',
    'img', 'input', 'ins', 'isindex', 'kdb', 'keygen', 'label',
    'legend', 'li', 'link', 'main', 'map', 'marquee', 'mark',
    'menu', 'meter', 'nav', 'nobr', 'noembed', 'noframes',
    'object', 'ol', 'optgroup', 'option', 'output', 'p',
    'param', 'plaintext', 'pre', 'progress', 'q', 'rp',
    'rt', 'ruby', 's', 'samp', 'script', 'section', 'select',
    'small', 'span', 'sources', 'strike', 'strong', 'sub',
    'summary', 'sup', 'table', 'tbody', 'td', 'textarea',
    'tfoot', 'th', 'thead', 'time', 'tr', 'tt', 'u', 'ul',
    'var', 'video', 'wbr', 'xmp', 'head', 'script', 'meta',
    'link', 'title'
];

/**
 * `.`, `#`, `>`, `+`, `tagName`, `~` - classical selectors.
 * @param {string} selector 
 */
const isClassicSelector = selector => {
    const _splitedSelector = selector.split("");
    const _selectorPrefix = _splitedSelector[0]; /* Prefix */

    if (['.', '#'].includes(_selectorPrefix)) {
        return true;
    }

    if (
        _splitedSelector.includes('>') || _splitedSelector.includes('+') ||
        _splitedSelector.includes('~')
    ) {
        return true;
    }

    if (HTML5Tags.includes(selector)) {
        return true;
    }

    return false;
}

/**
 * @param {string} selector 
 * @returns 
 */
const handleCustomSelector = selector => {
    let _splitedSelector = selector.split("");
    const _selectorPrefix = _splitedSelector[0]; /* Prefix */

    if (_selectorPrefix === ':') {
        _splitedSelector.splice(0, 1); /* Delete prefix */
        
        const daughterElementIndex = _splitedSelector[_splitedSelector.length - 1];
        _splitedSelector.splice(_splitedSelector.length - 1, 1); /* Delete element */

        _splitedSelector = _splitedSelector.join("");

        if (!document.querySelector(_splitedSelector).children[daughterElementIndex]) {
            return console.error(`[@_element] -> Not found: ${_splitedSelector} hasn't daughter element by index ${daughterElementIndex}`);
        } else {
            let _childrenSelector = ``;

            if (
                document.querySelector(_splitedSelector).children[daughterElementIndex] && 
                document.querySelector(_splitedSelector).children[daughterElementIndex].id !== ''
            ) {
                _childrenSelector = `#${document.querySelector(_splitedSelector).children[daughterElementIndex].id}`;
            } else if (document.querySelector(_splitedSelector).children[daughterElementIndex].classList.length > 0) {
                document.querySelector(_splitedSelector).children[daughterElementIndex].classList.forEach(item => {
                    _childrenSelector += `.${item} `
                });
                _childrenSelector.splice(_childrenSelector.length - 1, 1);
            }

            return document.querySelector(`${_splitedSelector} > ${_childrenSelector}`);
        }
    }
}

/**
 * Main class.
 */
class _Reflect {
    constructor(selector) {
        if (!selector || typeof selector !== 'string') {
            throw new Error(`[@selector] -> Nor found or nor a string.`);
        }

        if (isClassicSelector(selector)) {
            this.rootElement = document.querySelector(selector);
        } else {
            this.rootElement = handleCustomSelector(selector);
        }

        this.renderer = new Renderer(this.rootElement);
        this.version = '2.0.0';
        this.developer = 'HarrisonManxe';
        this.repository = 'https://github.com/HarrisonManxe/Reflect';

        console.log(`[Reflect] -> Successfully import to your web-page\n\n[Developer] -> ${this.developer}\n\n[Docs/Support] -> ${this.repository}`);

        return this;
    }

    /* Methods to work with classes */

    /**
     * @return {string[]}
     */
    getClasses() {
        return this.rootElement.classList;
    }

    /**
     * @param {string|string[]} newClass
     */
    addClass(newClass) {
        if (typeof newClass === 'string') {
            this.rootElement.classList.add(newClass);
        } else if (Array.isArray(newClass)) {
            newClass.forEach(_class => {
                if (!this.rootElement.classList.includes(_class)) {
                    this.rootElement.classList.add(String(item));
                }
            });
        } else {
            console.error(`[@newClass] -> not found or not a string/array!`);

            return this;
        }

        return this;
    }

    /**
     * @param {string|string[]} className
     */
    removeClass(className) {
        if (typeof className === 'string') {
            this.rootElement.classList.remove(className);
        } else if (Array.isArray(className)) {
            className.forEach(_class => {
                this.rootElement.classList.forEach(__class => {
                    if (String(__class) === String(_class)) {
                        this.rootElement.classList.remove(__class);
                    }
                });
            });
        } else {
            console.error(`[@className] -> not found or not a string/array!`);

            return this;
        }

        return this;
    }

    /**
     * @param {string} className 
     */
    toggleClass(className) {
        if (!className || typeof className !== 'string') {
            console.error(`[@className] -> not found or not a string!`);

            return this;
        }

        this.rootElement.classList.toggle(className)

        return this;
    }

    /* Methods to work with ID */

    getIds() {
        if (this.rootElement.id.length > 0) {
            return this.rootElement.id.split(" ");
        }

        return this;
    }

    /**
     * @param {string|string[]} newId 
     */
    addId(newId) {
        if (typeof newId === 'string') {
            this.rootElement.id += ` ${newId}`;
        } else if (Array.isArray(newId)) {
            newId.forEach(id => {
                this.rootElement += ` ${String(id)}`
            });
        } else {
            console.error(`[@newId] -> not found or not a string/array!`);

            return this;
        }

        return this;
    }

    /**
     * @param {string|string[]} id 
     */
    removeId(id) {
        if (typeof id === 'string') {
            if (this.getIds().includes(id)) {
                let _id = this.getIds();
                _id.splice(_id.indexOf(id), 1);
                _id = _id.join(" ");
                this.rootElement.id = _id;
            }
        } else if (Array.isArray(id)) {
            id.forEach(_id => {
                if (this.getIds().includes(id)) {
                    let _id = this.getIds();
                    _id.splice(_id.indexOf(id), 1);
                }
            })

            _id = _id.join(" ");
            this.rootElement.id = _id;
        } else {
            console.error(`[@id] -> not found or not a string/array!`);

            return this;
        }

        return this;
    }

    /**
     * @param {string|string[]} id 
     */
    observerId(id) {
        if (!id || typeof id !== 'string') {
            console.error(`[@id] -> not found or not a string!`);

            return this;
        }

        if (!this.getIds().includes(id)) {
            this.addId(id);
        } else {
            this.removeId(id);
        }

        return this;
    }

    /* Works with attribute */

    /**
     * @param {string} attributeName 
     */
    getAttr(attributeName) {
        if (!attributeName || typeof attributeName !== 'string') {
            console.error(`[@attributeName] -> not found or not a string!`);

            return this;
        }

        try {
            return this.rootElement.getAttribute(attributeName);
        } catch (_error) {
            console.error(`[@attributeName] -> ${_error}`);
        }
    }

    /**
     * @param {string} attributeName 
     * @param {string} attributeValue 
     */
    setAttr(attributeName, attributeValue) {
        if (!attributeName || typeof attributeName !== 'string') {
            console.error(`[@attributeName] -> not found or not a string!`);

            return this;
        }

        if (!attributeValue || typeof attributeValue !== 'string') {
            console.error(`[@attributeValue] -> not found or not a string!`);

            return this;
        }

        try {
            return this.rootElement.setAttribute(attributeName, attributeValue);
        } catch (_error) {
            console.error(`[@attributeName] -> ${_error}`);
        }
    }

    /**
     * @param {string} attributeName 
     */
    removeAttr(attributeName) {
        if (!attributeName || typeof attributeName !== 'string') {
            console.error(`[@attributeName] -> not found or not a string!`);

            return this;
        }

        this.rootElement.removeAttribute(attributeName);

        return this;
    }

    /**
     * @param {string} event 
     * @param {function} callback 
     */
    on(event, callback) {
        if (!event || typeof event !== 'string') {
            console.error(`[@event] -> not found or not a string!`);

            return this;
        }

        if (!callback || typeof callback !== 'function') {
            console.error(`[@callback] -> not found or not a function`);

            return this;
        }

        this.rootElement.addEventListener(event, callback);

        return this;
    }

    /**
     * @param {string} event 
     * @param {function} callback 
     */
    removeOn(event, callback) {
        if (!event || typeof event !== 'string') {
            console.error(`[@event] -> not found or not a string!`);

            return this;
        }

        if (!callback || typeof callback !== 'function') {
            console.error(`[@callback] -> not found or not a function`);

            return this;
        }

        this.rootElement.removeEventListener(event, callback);

        return this;
    }

    refresh() {
        window.location.reload();

        return this;
    }
}

/* Render class */
class Renderer {
    constructor(element) {
        this.element = element;
        this.childs = [];
        this.childTag = {
            'type': 'id',
            'value': 'x-created-by-reflect'
        }
    }

    getchildTagValue() {
        return this.childTag['value'];
    }

    /**
     * @param {string} newChildTagValue
     */
    setChildTagValue(newChildTagValue) {
        this.childTag['value'] = String(newChildTagValue);

        return this;
    }

    getchildTagType() {
        return this.childTag['type'];
    }

    /**
     * @param {string} newChildTagType
     */
    setChildTagType(newChildTagType) {
        if (!['id', 'class'].includes(newChildTagType.toLowerCase())) {
            return this;
        }

        this.childTag['type'] = String(newChildTagType);

        return this;
    }

    /**
     * @param {number|string} childIndex 
     */
    child(childIndex) {
        if (typeof childIndex !== 'number' && typeof childIndex !== 'string') {
            console.error(`[@childIndex] -> incorrect value type (must be string or number)!`);

            return this;
        }

        if (!this.childs[childIndex]) {
            console.error(`[@childIndex] -> child with index ${childIndex} bot exist!`);

            return this;
        }

        const CHILD_SELECTOR = this.childs[childIndex].CHILD_TAG_TYPE === 'id' ? `#${this.childs[childIndex].CHILD_TAG_VALUE}` : `.${this.childs[childIndex].CHILD_TAG_VALUE}`;

        console.log(CHILD_SELECTOR);

        return new Reflect(CHILD_SELECTOR);
    }
}

export { _Reflect as Reflect };