<?php
/**
 * General filters used in the theme
 *
 * @package Kala
 */

namespace Kala;

/**
 * Remove "Archive: " from archive titles
 *
 * @param string $title The title for the archive.
 * @return string
 */
function theme_archive_title( $title ) {
    if ( is_category() ) {
        $title = single_cat_title( '', false );
    } elseif ( is_tag() ) {
        $title = single_tag_title( '', false );
    } elseif ( is_author() ) {
        $title = '<span class="vcard">' . get_the_author() . '</span>';
    } elseif ( is_post_type_archive() ) {
        $title = post_type_archive_title( '', false );
    } elseif ( is_tax() ) {
        $title = single_term_title( '', false );
    } elseif ( is_home() ) {
        $title = get_the_title( get_option( 'page_for_posts' ) );
    }

    return $title;
}
add_filter( 'get_the_archive_title', 'Kala\theme_archive_title' );

/**
 * Automatically skip the default assigned slug on any attachment.
 * So an attachment that might normally get the slug "services" will now get the slug "services-2".
 */
add_filter( 'wp_unique_post_slug_is_bad_attachment_slug', '__return_true' );

/**
 * Move Yoast to the bottom of the page.
 *
 * @return string
 */
function yoast_to_bottom() {
    return 'low';
}
add_filter( 'wpseo_metabox_prio', 'Kala\yoast_to_bottom', 999, 1 );

/**
 * Add icon to button block.
 *
 * @param string $block_content  The block content about to be appended.
 * @param array  $block          The full block, including name and attributes.
 *
 * @return string The block contents, rendered (or altered).
 */
function render_block( $block_content, $block ) {
    if ( 'core/button' === $block['blockName'] && isset( $block['attrs']['className'] ) && false !== strpos( $block['attrs']['className'], 'is-style-button-big' ) ) {
            $icon = get_svg( 'chevron-right' );

            $block_content = str_replace( '</a>', $icon . '</a>', $block_content );
    }

    return $block_content;
}
add_filter( 'render_block', 'Kala\render_block', 10, 2 );

/**
 * Change excerpt length.
 *
 * @param [number] $length
 * @return number
 */
function custom_excerpt_length( $length ) {
    return 15;
}
add_filter( 'excerpt_length', 'Kala\custom_excerpt_length', 999 );

/**
 * Change excerpt more.
 *
 * @param [string] $more
 * @return string
 */
function custom_excerpt_more( $more ) {
    return '...';
}
add_filter( 'excerpt_more', 'Kala\custom_excerpt_more' );

/**
 * Change Yoast breadcrumb separator.
 *
 * @param [string] $separator
 * @return string
 */
function change_yoast_breadcrumb_separator( $separator ) {
    return '<span class="yoast-breadcrumbs__separator">' . $separator . '</span>';
}
add_filter( 'wpseo_breadcrumb_separator', 'Kala\change_yoast_breadcrumb_separator' );

/**
 * Add icon to menu item.
 *
 * @param [array] Items $items
 * @param [array] Arguments $args
 * @return array
 */
function add_icon_to_menu( $items, $args ) {
    foreach ( $items as $item ) {
        // Check if menu item is a services.
        $is_services = get_field( 'menu_item_services', $item->ID );

        if ( $is_services ) {
            $item->classes[] = 'is-menu-services';
        }

        // Check if menu item is a button.
        $is_button = get_field( 'menu_item_button', $item->ID );

        if ( $is_button ) {
            $item->classes[] = 'is-menu-button';
        }
    }

    return $items;
}
add_filter( 'wp_nav_menu_objects', 'Kala\add_icon_to_menu', 10, 2 );
