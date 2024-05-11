<?php
/**
 * Helper functions
 *
 * @package Meomblocks
 */

namespace MEOM\Blocks;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Returns an array of paths to all subdirectories in the given directory.
 *
 * @param string $directory Base directory to search.
 * @return array Paths to subdirectories.
 */
function get_directories( string $directory ): array {
    return glob( $directory . '*', GLOB_ONLYDIR );
}

/**
 * Fetches a list of custom blocks identifiers from the plugin.
 *
 * @return array List of custom block identifiers.
 */
function get_custom_blocks(): array {
    $blocks = [];
    foreach ( get_directories( BLOCKS_DIR ) as $dir ) {
        $block_name = basename( $dir );
        $blocks[]   = 'meomblocks/' . $block_name;
    }

    return $blocks;
}

/**
 * Set Categories
 *
 * @param array $categories Array of the categories.
 * @return array
 */
function block_category( $categories ) {
    return array_merge(
        [
            [
                'slug'  => 'meomblocks',
                'title' => __( 'Kustomoidut lohkot', 'meomblocks' ),
            ],
        ],
        $categories
    );
}
add_filter( 'block_categories_all', __NAMESPACE__ . '\block_category', 10 );

/**
 * Check if attribute exists.
 *
 * @param string $attr Name of the attribute.
 * @param array  $attributes Aray of the attributes.
 * @return boolean
 */
function has_attr( $attr, $attributes ) {
    if ( isset( $attributes[ $attr ] ) ) {
        return true;
    }
    return false;
}

/**
 * Get attribute or set default
 *
 * @param string $attr Needle.
 * @param array  $attributes All attributes.
 * @param string $fallback Fallback value if attribute not found.
 * @return mixed
 */
function attr( $attr, $attributes, $fallback = false ) {
    if ( isset( $attributes[ $attr ] ) ) {
        return $attributes[ $attr ];
    }

    return $fallback;
}
