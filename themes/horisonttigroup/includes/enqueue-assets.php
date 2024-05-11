<?php
/**
 * Register needed scripts and styles.
 *
 * @package Kala
 */

namespace Kala;

/**
 * Register scripts and styles.
 *
 * @return void
 */
function enqueue_scripts() {
    global $wp_styles;

    $style_deps = wp_style_is( 'global-styles' ) ? [ 'global-styles' ] : [];
    wp_enqueue_style(
        'theme-styles',
        get_theme_file_uri( 'build/css/theme.css' ),
        $style_deps,
        filemtime( get_theme_file_path( 'build/css/theme.css' ) )
    );

    wp_enqueue_script(
        'theme-scripts',
        get_theme_file_uri( 'build/js/main.js' ),
        [ 'jquery' ],
        filemtime( get_theme_file_path( 'build/js/main.js' ) ),
        true
    );

    // Data to JS.
    $data_array = [
        'expandChildNavText' => esc_html__( 'Sub menu', 'kala' ),
    ];

    wp_localize_script( 'theme-scripts', 'kalaData', $data_array );

    wp_deregister_script( 'wp-embed' );

    // Dequeue Core block styles.
    wp_dequeue_style( 'wp-block-library' );
}
add_action( 'wp_enqueue_scripts', 'Kala\enqueue_scripts' );

/**
 * Register scripts and styles for front-end and editor.
 *
 * @return void
 */
function enqueue_block_assets() {
    // Overwrite Core block styles with empty styles.
    wp_deregister_style( 'wp-block-library' );
    wp_register_style( 'wp-block-library', '' ); // phpcs:ignore

    // Overwrite Core theme styles with empty styles.
    wp_deregister_style( 'wp-block-library-theme' );
    wp_register_style( 'wp-block-library-theme', '' ); // phpcs:ignore
}
add_action( 'enqueue_block_assets', 'Kala\enqueue_block_assets' );

/**
 * Handles JavaScript detection.
 *
 * Replaces `no-js` class to `js` class in the root `<html>` element when JavaScript is detected.
 *
 * @return void
 */
function js_detection() {
    echo "<script>(function(html){html.className = html.className.replace(/\bno-js\b/,'js')})(document.documentElement);</script>\n";
}
add_action( 'wp_head', 'Kala\js_detection', 0 );

/**
 * Preload needed fonts in the head.
 *
 * @return void
 */
function preload_fonts() {
    $fonts = [
        THEME_URI . '/fonts/inter-v13-latin-regular.woff2' => 'woff2',
        THEME_URI . '/fonts/inter-v13-latin-600.woff2'     => 'woff2',
        THEME_URI . '/fonts/work-sans-v19-latin-700.woff2' => 'woff2',
    ];

    foreach ( $fonts as $font_link => $font_type ) {
        echo '<link rel="preload" href="' . esc_url( $font_link ) . '" as="font" type="font/' . esc_attr( $font_type ) . '" crossorigin>';
    }
}
add_action( 'wp_head', 'Kala\preload_fonts', 1 );
