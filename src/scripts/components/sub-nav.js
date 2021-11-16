document.addEventListener(render.ready, () => {
    const links = document.querySelectorAll('.sub-nav li a');
    const courseId = utils.getLocationParam('course_id');

    for (const link of links) {
        let linkUrl = (new URL(link.href));
        let linkSearchParams = linkUrl.searchParams;

        linkSearchParams.set('course_id', courseId);
        linkUrl.searchParams = linkSearchParams;

        link.href = linkUrl.toString();
    }
});

document.addEventListener(render.ready, () => {
    const links = document.querySelectorAll('.sub-nav li a');

    for (const link of links) {
        const selects = link.getAttribute('data-select').split(' ');
        for (const select of selects) {
            if (location.href.includes(select)) {
                link.classList.add('SELECTED');
            }
        }
    }
});
