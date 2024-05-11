<?php
/**
 * Plugin Name:       MEOM blocks
 * Description:       Block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       meomblocks
 *
 * @package           create-block
 */

namespace MEOM\Blocks;

const BLOCKS_DIR = __DIR__ . '/build/blocks/';

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Load the helper functions file.
require_once plugin_dir_path( __FILE__ ) . 'inc/helpers.php';

/**
 * Registers the blocks automatically using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function register_blocks() {
    foreach ( get_directories( BLOCKS_DIR ) as $directory ) {
        register_block_type( $directory );
    }
}
add_action( 'init', __NAMESPACE__ . '\register_blocks' );

// Use init hooks to set allowed blocks.
function initialize_allowed_blocks() {
    add_filter( 'allowed_block_types_all', __NAMESPACE__ . '\allowed_blocks', 10, 2 );
}
add_action( 'init', __NAMESPACE__ . '\initialize_allowed_blocks' );

/**
 * Add custom blocks to the allowed blocks array.
 *
 * @param mixed $allowed_blocks Boolean or array of allowed blocks.
 * @return mixed Modified list of allowed blocks or true if all blocks are allowed.
 */
function allowed_blocks( $allowed_blocks = [] ) {
    if ( ! is_array( $allowed_blocks ) ) {
        $allowed_blocks = [];
    }

    $custom_blocks  = get_custom_blocks();
    $allowed_blocks = array_merge( $allowed_blocks, $custom_blocks );
    $allowed_blocks = array_values( array_unique( $allowed_blocks ) );

    return $allowed_blocks;
}
