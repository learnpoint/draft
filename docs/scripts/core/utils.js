'use strict';

const utils = {
    getLocationParam: name => (new URL(document.location)).searchParams.get(name),
    getUrlParam: (url, name) => (new URL(url)).searchParams.get(name)
};
