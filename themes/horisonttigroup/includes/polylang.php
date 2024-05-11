<?php
/**
 * Polylang related hooks and functions.
 * - Set post types that should be translated
 * - Set taxonomies that should be translated
 * - Set post meta that should be synced across ACF fields
 *
 * @package Kala
 */

namespace Kala;

/**
 * Get post types that should be translated.
 * Add new post types here.
 *
 * @return array.
 */
function get_post_types_for_translation() {
    $post_types = array(
        'custom_post_type',
    );
    return $post_types;
}

/**
 * Get post types where the translations should not be enabled.
 *
 * @return array
 */
function get_post_types_for_translation_disable() {
    $post_types = array(
        'wp_block',
    );
    return $post_types;
}

/**
 * Get taxonomies that should be translated.
 * Add nex taxonomies here.
 *
 * @return array
 */
function get_taxonomies_for_translation() {
    $taxonomies = array(
        'category_name',
    );
    return $taxonomies;
}


/**
 * Auto enable and disable translations for wanted post types.
 *
 * @param array   $post_types The array of post type names.
 * @param boolean $is_settings True when displaying the list of custom post types in Polylang settings (avoid the user to modify the decision made by the plugin author for a post type).
 * @return array
 */
function edit_cpt_in_pll( $post_types, $is_settings ) {
    $translable_post_types = get_post_types_for_translation();
    $disabled_post_types   = get_post_types_for_translation_disable();
    // Enable translations.
    foreach ( $translable_post_types as $post_type ) {
        if ( $is_settings ) {
            // Hides cpts from the list of custom post types in Polylang settings.
            unset( $post_types[ $post_type ] );
        } else {
            // Enables language and translation management for cpts.
            $post_types[ $post_type ] = $post_type;
        }
    }
    // Disable translations.
    foreach ( $disabled_post_types as $post_type ) {
        // Hide cpt from language settings and disable translation management.
        unset( $post_types[ $post_type ] );
    }

    return $post_types;
}
add_filter( 'pll_get_post_types', 'Kala\edit_cpt_in_pll', 10, 2 );

/**
 * Auto enable translations for wanted taxonomies.
 *
 * @param array   $taxonomies The array of taxonomy names.
 * @param boolean $is_settings True when displaying the list of custom taxonomies in Polylang settings (avoid the user to modify the decision made by the plugin author for a taxonomy).
 * @return array
 */
function add_tax_to_pll( $taxonomies, $is_settings ) {
    $translable_taxonomies = get_taxonomies_for_translation();
    foreach ( $translable_taxonomies as $taxonomy ) {
        if ( $is_settings ) {
            // Hides taxonomies from the list of taxs in Polylang settings.
            unset( $taxonomies[ $taxonomy ] );
        } else {
            // Enables language and translation management for taxonomies.
            $taxonomies[ $taxonomy ] = $taxonomy;
        }
    }
    return $taxonomies;
}
add_filter( 'pll_get_taxonomies', 'Kala\add_tax_to_pll', 10, 2 );
