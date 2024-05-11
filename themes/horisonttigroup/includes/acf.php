<?php

if ( function_exists( 'acf_add_options_page' ) ) {

    acf_add_options_page(
        array(
            'page_title' => 'Yleiset asetukset ja sisällöt',
            'menu_title' => 'Yleiset asetukset ja sisällöt',
            'menu_slug'  => 'theme-general-settings',
            'capability' => 'edit_posts',
            'redirect'   => false,
        )
    );

}
