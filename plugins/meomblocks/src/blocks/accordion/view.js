import Accordion from '@10up/component-accordion'; // eslint-disable-line

/**
 * Accordion.
 */
function initAccordion() {
    function calculateHeight() {
        // Add max-height to accordion content.
        const accordionContents =
            document.querySelectorAll( '.accordion-content' );

        if ( accordionContents.length > 0 ) {
            accordionContents.forEach( function ( accordionContent ) {
                accordionContent.removeAttribute( 'hidden', '' );
                const maxHeightKey = '--accordion-max-height';
                const accordionContentInner = accordionContent.querySelector(
                    '.accordion__content-inner'
                );
                accordionContent.style.setProperty(
                    maxHeightKey,
                    `${
                        accordionContentInner.getBoundingClientRect().height
                    }px`
                );
            } );
        }
    }

    new Accordion( '.js-accordion', {
        onCreate() {
            calculateHeight();
        },
        onOpen() {
            // Recalculate height on open.
            calculateHeight();
        },
        onClose() {},
        onToggle() {},
    } );
}

// Init.
initAccordion();
