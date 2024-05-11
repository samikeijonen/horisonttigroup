<?php
$hide_last_item = ! empty( $args['hide_last_item'] ) ? $args['hide_last_item'] : false;
$yoast_class    = $hide_last_item ? 'yoast-breadcrumbs yoast-breadcrumbs--hide-last-item width-medium' : 'yoast-breadcrumbs width-medium';

if ( function_exists( 'yoast_breadcrumb' ) ) :
    yoast_breadcrumb( '<p class="' . $yoast_class . '">', '</p>' );
endif;
