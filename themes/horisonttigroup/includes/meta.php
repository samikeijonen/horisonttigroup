<?php

namespace Kala;

// register custom meta tag field
function meom_register_fault_message_meta() {
    register_post_meta(
        '',
        'meom_show_fault_messages',
        array(
            'show_in_rest' => true,
            'single'       => true,
            'default'      => false,
            'type'         => 'boolean',
        )
    );
}
add_action( 'init', __NAMESPACE__ . '\meom_register_fault_message_meta' );
