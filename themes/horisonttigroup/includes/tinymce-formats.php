<?php

namespace Kala;

/**
 * Add custom formats to dashboard editors.
 */
function tiny_mce_before_init_insert_formats( $init_array ) {
    $style_formats = [
        [
            'title'    => 'Painike',
            'selector' => 'a',
            'classes'  => 'btn',
            'wrapper'  => false,
        ],
    ];

    $init_array['style_formats'] = wp_json_encode( $style_formats );
    return $init_array;
}
add_filter( 'tiny_mce_before_init', 'Kala\tiny_mce_before_init_insert_formats' );

function mce_buttons_2( $buttons ) {
    array_unshift( $buttons, 'styleselect' );
    return $buttons;
}
add_filter( 'mce_buttons_2', 'Kala\mce_buttons_2' );
