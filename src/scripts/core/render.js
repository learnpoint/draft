(function () {

    // Export
    const render = window.render = {
        ready: 'render.ready'
    }

    document.addEventListener(db.ready, () => {
        const renderStart = Date.now();
        runRender(document.body, db);
        evalExpressions(document.documentElement);
        document.documentElement.classList.remove('render__rendering');
        console.debug('Draft render:', Date.now() - renderStart, 'ms');
        document.dispatchEvent(new Event(render.ready));
    });

    function runRender(scope, data) {
        if (scope.matches(matcher(data))) {
            hydrate(scope, data[scope.tagName.toLowerCase()]);
        } else {
            for (const child of scope.children) {
                runRender(child, data);
            }
        }
    }

    function matcher(data) {
        return Object.getOwnPropertyNames(data).join(', ');
    }

    function hydrate(scope, data) {
        if (Array.isArray(data)) {
            if (scope.hasAttribute('where')) {
                data = data.where(scope.getAttribute('where'));
            }
            const templateHTML = scope.innerHTML;
            scope.innerHTML = "";
            for (const item of data) {
                const template = document.createElement('template');
                template.innerHTML = templateHTML;
                hydrate(template.content, item);
                scope.appendChild(template.content);
            }
        } else {
            if (scope.attributes) {
                for (const attr of scope.attributes) {
                    attr.value = renderText(attr.value, data);
                }
            }
            for (const child of scope.childNodes) {
                if (child.nodeType === Node.TEXT_NODE) {
                    child.textContent = renderText(child.textContent, data);
                } else if (child.nodeType === Node.ELEMENT_NODE) {
                    if (child.matches(matcher(data))) {
                        hydrate(child, data[child.tagName.toLowerCase()]);
                    } else {
                        hydrate(child, data);
                    }
                }
            }
        }
    }

    function renderText(templateText, data) {
        return templateText.replace(/\[\[.*?\]\]/g, match => {
            const prop = match.replace('[[', '').replace(']]', '').trim();

            let val;

            if (prop.includes('.')) {
                const propList = prop.split('.');
                val = data[propList[0]]
                for (let i = 1; i < propList.length; i++) {
                    val = val[propList[i]];
                }
            } else {
                val = data[prop];
            }

            return val;
        });
    }

    function evalExpressions(scope) {
        for (const attribute of scope.attributes) {
            if (hasExpressions(attribute.value)) {
                scope.setAttribute(attribute.name, replaceExpressions(attribute.value))
            }
        }

        for (const child of scope.childNodes) {
            if (child.nodeType === Node.TEXT_NODE) {
                if (hasExpressions(child.textContent)) {
                    child.textContent = replaceExpressions(child.textContent);
                }
            } else if (child.nodeType === Node.ELEMENT_NODE) {
                evalExpressions(child);
            }
        }
    }

    function hasExpressions(str) {
        return str.includes('{{');
    }

    function replaceExpressions(str) {
        return str.replace(/{{.*?}}/g, match => {
            const expression = match.replace('{{', '').replace('}}', '').trim();
            return eval(expression);
        });
    }

})();
