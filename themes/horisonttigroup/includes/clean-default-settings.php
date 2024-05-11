<?php

namespace Kala;

/**
 * Clean unnecessary elements from head
 *
 * @link http://cubiq.org/clean-up-and-optimize-wordpress-for-your-next-theme
 * @param [type] $image Image.
 * @return void
 */
function clean_setup( $image ) {
    remove_action( 'wp_head', 'wp_generator' );
    remove_action( 'wp_head', 'wlwmanifest_link' );
    remove_action( 'wp_head', 'rsd_link' );
    remove_action( 'wp_head', 'wp_shortlink_wp_head' );
    remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head', 10 );
    remove_action( 'wp_head', 'start_post_rel_link' );
    remove_action( 'wp_head', 'index_rel_link' );
    remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
    remove_action( 'wp_print_styles', 'print_emoji_styles' );

    add_filter( 'the_generator', '__return_false' );
    add_filter( 'use_default_gallery_style', '__return_false' );
}
add_action( 'after_setup_theme', 'Kala\clean_setup' );

/**
 * Move jQuery from head to footer.
 *
 * @param object $wp_scripts The scripts object.
 * @return void
 */
function move_jquery_into_footer( $wp_scripts ) {
    if ( is_admin() ) {
        return;
    }

    $wp_scripts->add_data( 'jquery', 'group', 1 );
    $wp_scripts->add_data( 'jquery-core', 'group', 1 );
    $wp_scripts->add_data( 'jquery-migrate', 'group', 1 );
}
add_action( 'wp_default_scripts', 'Kala\move_jquery_into_footer' );

/**
 * Add media images without wrapper
 *
 * @return void
 */
function admin_init() {
    update_option( 'image_default_link_type', 'none' );
}
add_action( 'admin_init', 'Kala\admin_init' );

/**
 * Remove WordPress Widgets from Dashboard Area
 *
 * @return void
 */
function remove_wp_dashboard_widgets() {
    global $wp_meta_boxes;
    unset( $wp_meta_boxes['dashboard']['side']['core']['dashboard_quick_press'] );
    unset( $wp_meta_boxes['dashboard']['normal']['core']['dashboard_incoming_links'] );
    unset( $wp_meta_boxes['dashboard']['normal']['core']['dashboard_right_now'] );
    unset( $wp_meta_boxes['dashboard']['normal']['core']['dashboard_plugins'] );
    unset( $wp_meta_boxes['dashboard']['normal']['core']['dashboard_recent_drafts'] );
    unset( $wp_meta_boxes['dashboard']['normal']['core']['dashboard_recent_comments'] );
    unset( $wp_meta_boxes['dashboard']['side']['core']['dashboard_primary'] );
    unset( $wp_meta_boxes['dashboard']['side']['core']['dashboard_secondary'] );
    unset( $wp_meta_boxes['dashboard']['normal']['core']['dashboard_activity'] );
}
add_action( 'wp_dashboard_setup', 'Kala\remove_wp_dashboard_widgets' );

/**
 * Remove Admin Menu Link to Theme Customizer
 */
function remove_admin_menu_link_to_customizer() {
    global $submenu;

    if ( isset( $submenu['themes.php'] ) ) {
        foreach ( $submenu['themes.php'] as $index => $menu_item ) {
            if ( in_array( 'customize', $menu_item, true ) ) {
                unset( $submenu['themes.php'][ $index ] );
            }
        }
    }
}
add_action( 'admin_menu', 'Kala\remove_admin_menu_link_to_customizer' );
