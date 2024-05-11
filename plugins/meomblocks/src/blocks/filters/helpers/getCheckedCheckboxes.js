/**
 * Get all checked checkboxes for different filters.
 *
 * @param {Object} element Elements to loop.
 */
function getCheckedCheckboxes( element ) {
    // Get all checkboxes.
    const checkboxes = element.querySelectorAll( 'input[type="checkbox"]' );

    // Collect checked ones in array.
    const allChecked = [];

    // Collect checked ones and add value (taxonomy slug) to array.
    checkboxes.forEach( ( checkbox ) => {
        if ( checkbox.checked ) {
            allChecked.push( checkbox.value );
        }
    } );

    // Return checked ones.
    return allChecked;
}

export default getCheckedCheckboxes;
