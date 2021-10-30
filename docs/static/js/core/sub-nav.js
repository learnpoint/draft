document.addEventListener(render.ready, () => {
    const subNav = document.querySelector('.sub-nav');
    const links = subNav.querySelectorAll('li a');
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
    let locationPath = (new URL(location.href).pathname);

    const subNav = document.querySelector('.sub-nav');
    const links = subNav.querySelectorAll('li a');

    for (const link of links) {
        let linkPath = (new URL(link.href).pathname);

        if (linkPath === locationPath) {
            link.classList.add('SELECTED');
        }
    }
});