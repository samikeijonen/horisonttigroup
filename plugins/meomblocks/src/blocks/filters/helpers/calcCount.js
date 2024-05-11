import getCheckedCheckboxes from './getCheckedCheckboxes';

/**
 * Count all checked checkboxes for different filters.
 *
 * @param {Object} element Element.
 */
function calcCount( element ) {
    // Count wrapper.
    const filtersCount = document.querySelector( '.js-filters-count' );

    // Bails early.
    if ( filtersCount ) {
        // Get all checkboxes.
        const checkboxesCount = getCheckedCheckboxes( element );

        // Set count.
        filtersCount.innerHTML = checkboxesCount.length;
    }

    // Calculate count for each fieldset. Do not use for now.
    /*
    const fieldsetToggles = document.querySelectorAll(
        '[data-meom-filters="fieldset-toggle"]'
    );

    for ( const fieldsetToggle of fieldsetToggles ) {
        // Fieldset is the next sibling of the button.
        const fieldsetWrapper = fieldsetToggle.nextElementSibling;
        const checkboxesCount = getCheckedCheckboxes( fieldsetWrapper );

        // Update count.
        const fieldsetCount = fieldsetToggle.querySelector(
            '.filters__fieldset-toggle-count'
        );

        if ( fieldsetCount ) {
            fieldsetCount.innerHTML = `(${ checkboxesCount.length })`;
        }
    }
    */
}

export default calcCount;
