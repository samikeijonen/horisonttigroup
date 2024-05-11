<?php
/**
 * Gutenberg initialization and settings
 *
 * @package Kala
 */

namespace Kala;

/**
 * Register Gutenberg styles and custom Google Font
 * Some Gutenberg settings for js.
 *
 * @link https://www.billerickson.net/wordpress-color-palette-button-styling-gutenberg/
 */
function gutenberg_styles() {
    // Add editor overrides styles.
    wp_enqueue_style(
        'gutenberg-styles-editor',
        get_theme_file_uri( 'build/css/editor-overrides.css' ),
        [],
        filemtime( get_theme_file_path( 'build/css/editor-overrides.css' ) )
    );

    // Editor related JS.
    wp_enqueue_script(
        'gutenberg-scripts-editor',
        get_theme_file_uri( 'build/js/editor.js' ),
        [ 'wp-blocks', 'wp-dom' ],
        filemtime( get_theme_file_path( 'build/js/editor.js' ) ),
        true
    );
}
add_action( 'enqueue_block_editor_assets', 'Kala\gutenberg_styles' );

/**
 * Add theme support for needed Gutenberg features
 */
function gutenberg_setup() {
    remove_theme_support( 'core-block-patterns' );

    // By adding the `theme.json` file block templates automatically get enabled.
    // Because the template editor will need additional QA and work to get right,
    // the default is to disable this feature.
    remove_theme_support( 'block-templates' );

    // Add colors in theme.json under color.palette.
    // Add font-sizes in theme.json under typography.fontSizes.
}
add_action( 'after_setup_theme', 'Kala\gutenberg_setup' );

/**
 * Determine which blocks are allowed for the whole site and for certain custom post types.
 * If you need to remove block from certain post_type, template etc, you can do it like this:
 * delete_element_by_value( 'meomblocks/block-name', $blocks_to_add );
 *
 * @param array  $allowed_blocks List of allowed blocks.
 * @param object $post Post object.
 * @return array
 */
function gutenberg_allowed_blocks( $allowed_blocks, $post ) {
    // Set allowed core blocks.
    $blocks_to_add = [
        'core/block',
        'core/image',
        'core/gallery',
        'core/paragraph',
        'core/heading',
        'core/list',
        'core/list-item',
        'core/embed',
        'core/shortcode',
        'core/button',
        'core/buttons',
        'core/separator',
        'core/table',
        'core/quote',
        'core/columns',
        // `core/column` is needed for example in patterns, otherwise they don't work.
        'core/column',
        'core/group',
        'core/social-links',
        'core/social-link',
        'core/video',
        'gravityforms/form',
        'yoast-seo/breadcrumbs',
        'gravityforms/form',
        'leadin/hubspot-form-block',
    ];

    // If we remove blocks from the array, indexes need to be generated again.
    $allowed_blocks = array_values( $blocks_to_add );

    return $allowed_blocks;
}
add_filter( 'allowed_block_types_all', 'Kala\gutenberg_allowed_blocks', 10, 2 );

/**
 * Register block pattern categories.
 *
 * @return void
 */
function register_meom_block_pattern_category() {
    register_block_pattern_category(
        'meom-content',
        [
            'label' => __( 'Sisältö', 'kala' ),
        ]
    );

    register_block_pattern_category(
        'meom-page-layouts',
        [
            'label' => __( 'Sivupohjat', 'kala' ),
        ]
    );
}
add_action( 'init', 'Kala\register_meom_block_pattern_category' );

/**
 * Determine which embeds are allowed.
 * By default only youtube is allowed, defined in MEOM Dodo plugin.
 *
 * @param array  $allowed_embeds List of allowed embeds.
 * @return array $allowed_embeds Modified array of allowed embeds.
 */
function gutenberg_allowed_embeds( $allowed_embeds ) {
    $allowed_embeds = [
        'youtube',
        'vimeo',
    ];

    return $allowed_embeds;
}
// Take comment off if you need to allow more embeds.
//add_filter( 'meom_dodo_allowed_embed_variants', 'Kala\gutenberg_allowed_embeds' );

/**
 * Add support for block template parts.
 *
 * @return void
 */
function add_block_template_part_support() {
    add_theme_support( 'block-template-parts' );
}
add_action( 'after_setup_theme', 'Kala\add_block_template_part_support' );

/**
 * Add icons to blocks.
 *
 * @param string $block_content  The block content about to be appended.
 * @param array  $block          The full block, including name and attributes.
 *
 * @return string The block contents, rendered (or altered).
 */
function render_icons( $block_content, $block ) {
    if ( 'core/list' === $block['blockName'] && isset( $block['attrs']['className'] ) && ( 'is-style-list-checkmark' === $block['attrs']['className'] || 'is-style-list-checkmark-center' === $block['attrs']['className'] ) ) {
            $check = get_svg( 'check' );

            $block_content = str_replace( '<li>', '<li><span class="icon-wrapper">' . $check . '</span><span class="text-wrapper">', $block_content );
    }

    return $block_content . '</span>';
}
add_filter( 'render_block', 'Kala\render_icons', 10, 2 );
