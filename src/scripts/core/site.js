document.addEventListener(render.ready, () => {
    const leftNav = document.querySelector('.site__left-nav');
    const links = leftNav.querySelectorAll('li a');

    for (const link of links) {
        if (link.href === location.href) {
            link.classList.add('SELECTED');
            continue;
        }

        const locationCourseId = utils.getLocationParam('course_id');
        const linkCourseId = utils.getUrlParam(link.href, 'course_id');
        if (locationCourseId && locationCourseId === linkCourseId) {
            link.classList.add('SELECTED');
            continue;
        }
    }
});
