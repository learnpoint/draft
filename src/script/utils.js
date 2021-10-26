'use strict';

const utils = {
    locationParam: name => (new URL(document.location)).searchParams.get(name)
};
