/* Import external depedencies. */
import { getQueryArgs } from '@wordpress/url';
import { updateAria } from '@meom/navigation'; // eslint-disable-line

/* Import internal depedencies. */
import handleFetch from './helpers/handleFetch';
import config from './../../../../meom-filters/filters-config.json';

/**
 * Filters.
 */
const filters = () => {
    // Filters form.
    const filtersForm = document.querySelector( '[data-meom-filters="form"]' );

    // Bail if there is no filters nor markup wrapper.
    if ( ! filtersForm ) {
        return;
    }

    // Filters wrapper
    const filtersWrapper = document.querySelector(
        '[data-meom-filters="filters-wrapper"]'
    );

    // Load more button.
    const loadMore = document.querySelector(
        '[data-meom-filters="load-more"]'
    );

    // Filters toggle button.
    const filtersToggle = document.querySelector(
        '[data-meom-filters="filters-toggle"]'
    );

    // Filters close button.
    const filtersClose = document.querySelector(
        '[data-meom-filters="close"]'
    );

    // Overlay.
    const filtersOverlay = document.querySelector(
        '[data-meom-filters="overlay"]'
    );

    // Filters submit button.
    const filtersSubmit = document.querySelector(
        '[data-meom-filters="submit"]'
    );

    // Filters reset button.
    const filtersReset = document.querySelector(
        '[data-meom-filters="reset"]'
    );

    // Post type from data attribute `data-meom-filters-post-type`.
    const postType = filtersForm.getAttribute( 'data-meom-filters-post-type' )
        ? filtersForm.getAttribute( 'data-meom-filters-post-type' )
        : 'customer';

    // Default filter arguments.
    const args = {
        post_type: postType,
        posts_per_page: 12,
        paged: 1,
    };

    // Let's pick what we put in to the URL.
    const urlObject = {};

    /**
     * Handle changes on form.
     *
     * @param {Object} event Event object.
     */
    function handleChange( event ) {
        event.preventDefault();
        handleFetch( false, args, urlObject, postType, filtersForm, config );
    }

    /**
     * Handle load more button click.
     *
     */
    function handleLoadMore() {
        // Do the fetch and append to existing posts.
        handleFetch( true, args, urlObject, postType, filtersForm, config );
    }

    /**
     * Handle filter toggle button click.
     *
     */
    function handleFilterToggle() {
        filtersWrapper.classList.toggle( 'is-opened' );
        updateAria( filtersToggle, 'expanded' );

        document
            .querySelector( 'html' )
            .classList.toggle( 'filters-scroll-stop' );
    }

    /**
     * Handle filter reset button click.
     *
     * @param {Object} event Event object.
     */
    function handleFilterReset( event ) {
        // Bail if not clicking reset button (several same buttons).
        if ( ! event.target.closest( '[data-meom-filters="reset"]' ) ) {
            return;
        }

        filtersForm.reset();

        // And then handle fetch.
        handleFetch( false, args, urlObject, postType, filtersForm, config );
    }

    /**
     * Handle filter reset button click.
     *
     * @param {Object} event Event object.
     */
    function handleFilterFieldsetToggle( event ) {
        // Bail if not clicking fieldset toggle button (several same buttons).
        if (
            ! event.target.closest( '[data-meom-filters="fieldset-toggle"]' )
        ) {
            return;
        }

        updateAria( event.target, 'expanded' );
    }

    /**
     * Close filters when clicking outside.
     *
     * @param {Object} event
     */
    function handleDocClick( event ) {
        // Bail if clicking inside the filters.
        if ( event.target.closest( '[data-meom-filters="filters-wrapper"]' ) ) {
            return;
        }

        // Or clicking inside the form.
        if ( event.target.closest( '[data-meom-filters="form"]' ) ) {
            return;
        }

        // Close filters if they are open.
        if (
            filtersWrapper &&
            filtersWrapper.classList.contains( 'is-opened' )
        ) {
            handleFilterToggle();
        }
    }

    /**
     * Init filters and load filters from URL query vars.
     */
    function initFilters() {
        // Clear all fields.
        filtersForm.reset();

        // Get state from the URL.
        const getStateFromUrl = getQueryArgs( document.location.href );

        // Check all checkboxes which match the URL query vars.
        // This way we can send the link to someone else or refresh the page.
        if ( Object.entries( getStateFromUrl ).length > 0 ) {
            // Loop tax_query from config.
            const taxQueries = config[ postType ].tax_query;
            if ( taxQueries ) {
                for ( const taxQuery of taxQueries ) {
                    const statesFromUrl = getStateFromUrl[ taxQuery.urlKey ];
                    if ( statesFromUrl && statesFromUrl.length > 0 ) {
                        // Get all checkboxes based on name.
                        const allTaxCheckboxes = filtersForm.querySelectorAll(
                            `[name="${ taxQuery.name }"]`
                        );

                        // Loop them over and check them if URL query parameter array includes the value.
                        const statesFromUrlValues = statesFromUrl.split( ',' );
                        allTaxCheckboxes.forEach( ( checkbox ) => {
                            if (
                                statesFromUrlValues.includes( checkbox.value )
                            ) {
                                checkbox.checked = true;
                            }
                        } );
                    }
                }
            }

            // Select correct order.
            if ( getStateFromUrl[ config[ postType ].order.urlKey ] ) {
                const selectOrder = document.querySelector(
                    `[name="${
                        config[ postType ].order.name
                    }"] option[value="${
                        getStateFromUrl[ config[ postType ].order.urlKey ]
                    }"]`
                );

                if ( selectOrder ) {
                    selectOrder.selected = true;
                }
            }

            // Output search value.
            if ( getStateFromUrl[ config.search.urlKey ] ) {
                const search = document.querySelector(
                    `[name="${ config.search.name }"]`
                );

                if ( search ) {
                    search.value = getStateFromUrl[ config.search.urlKey ];
                }
            }
        }

        // Do the fetch.
        handleFetch( false, args, urlObject, postType, filtersForm, config );
    }

    // Listen change and submit events on filters form.
    filtersForm.addEventListener( 'change', handleChange, false );
    filtersForm.addEventListener( 'submit', handleChange, false );

    // Listen load more clicks.
    if ( loadMore ) {
        loadMore.addEventListener( 'click', handleLoadMore, false );
    }

    // Listen filter toggle clicks.
    if ( filtersToggle ) {
        filtersToggle.addEventListener( 'click', handleFilterToggle, false );
    }

    // Listen filter close clicks.
    if ( filtersClose ) {
        filtersClose.addEventListener( 'click', handleFilterToggle, false );
    }

    // Listen filter overlay clicks.
    if ( filtersOverlay ) {
        filtersOverlay.addEventListener( 'click', handleFilterToggle, false );
    }

    // Listen filter submit clicks.
    if ( filtersSubmit ) {
        filtersSubmit.addEventListener( 'click', handleFilterToggle, false );
    }

    // Listen filter reset clicks.
    if ( filtersReset ) {
        document.addEventListener( 'click', handleFilterReset, false );
    }

    // Listen filter fieldset clicks.
    filtersForm.addEventListener( 'click', handleFilterFieldsetToggle, false );

    // Handle clicking outside of filters.
    document.addEventListener( 'click', handleDocClick, false );

    // Listen history changes (browser back and forward button).
    // popstate have event.state which we could use but let's use the URL as source of truth.
    window.addEventListener( 'popstate', initFilters );

    // Init filters.
    initFilters();
};

filters();
