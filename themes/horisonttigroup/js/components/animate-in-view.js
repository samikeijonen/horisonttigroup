/* global IntersectionObserver */
/* https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API */
/**
 * Animate elements when they appear on view.
 *
 * Link 1: https://www.smashingmagazine.com/2021/07/dynamic-header-intersection-observer/
 * Link 2: https://www.hweaver.com/intersection-observer-single-page-navigation/
 *
 * Example CSS could look something like this for animated text:
 *
 * .text-and-image__content h2,
 * .text-and-image__content p  {
 *      animation-duration: $transition-duration-5;
 *      animation-fill-mode: both;
 *      opacity: 0;
 * }
 *
 * .is-animating .text-and-image__content h2,
 * .is-animating .text-and-image__content p {
 *      animation-name: fade-in-down;
 *}
 */
const animateInView = () => {
    // Add data attributes for animations.
    const siteAnimations = document.querySelectorAll(
        '.iloq-animation > h1, .iloq-animation > h2, .iloq-animation > h3, .iloq-animation > p, .iloq-animation > div '
    );

    siteAnimations.forEach( ( siteAnimation ) => {
        siteAnimation.dataset.animated = 'animated';
    } );

    // Start generating the animation trigger.
    const animations = document.querySelectorAll( '[data-animated]' );

    let prevYPosition = 0;
    let direction = 'up';

    /**
     * What to do when firing animation.
     *
     * @param {Object} target
     */
    function fireAnimation( target ) {
        target.classList.add( 'is-animating' );
    }

    /**
     * When to fire animation.
     *
     * @param {Object} entry Our entry.
     * @return {boolean}     true or false.
     */
    function shouldUpdate( entry ) {
        // We don't really use down or up in here but might be useful for other projects.
        if ( direction === 'down' && entry.isIntersecting ) {
            return true;
        }

        if ( direction === 'up' && entry.isIntersecting ) {
            return true;
        }

        return false;
    }

    /**
     * Animation logic.
     *
     * @param {*} entries
     */
    function onIntersect( entries ) {
        entries.forEach( ( entry ) => {
            if ( window.scrollY > prevYPosition ) {
                direction = 'down';
            } else {
                direction = 'up';
            }

            prevYPosition = window.scrollY;

            const target = entry.target;

            if ( shouldUpdate( entry ) ) {
                fireAnimation( target );
            }
        } );
    }

    /* Observe when 50% in view. */
    const options = {
        rootMargin: '0px',
        threshold: 0.5,
    };

    const observer = new IntersectionObserver( onIntersect, options );

    /* Observe all sections which have `data-animatated` attribute. */
    animations.forEach( ( animation ) => {
        observer.observe( animation );
    } );
};

export default animateInView;
