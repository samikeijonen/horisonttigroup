<?php

namespace Kala;

function add_post_types() {
    $labels = [
        'name'                  => __( 'Kohteet', 'kala' ),
        'singular_name'         => __( 'Kohde', 'kala' ),
        'add_new'               => __( 'Lisää uusi kohde', 'kala' ),
        'edit_item'             => __( 'Muokkaa kohdetta', 'kala' ),
        'search_items'          => __( 'Etsi kohteita', 'kala' ),
        'featured_image'        => __( 'Kohteen kuva', 'kala' ),
        'set_featured_image'    => __( 'Aseta kohteen kuva', 'kala' ),
        'remove_featured_image' => __( 'Poista kohteen kuva', 'kala' ),
        'item_published'        => __( 'Kohde julkaistu', 'kala' ),
        'item_trashed'          => __( 'Kohde julkaistu', 'kala' ),
        'item_updated'          => __( 'Kohde on päivitetty', 'kala' ),
        'item_link'             => __( 'Kohteen linkki', 'kala' ),
        'item_link_description' => __( 'Linkki kohteeseen', 'kala' ),
    ];

    $args = [
        'labels'             => $labels,
        'description'        => __( 'Kohteet.', 'kala' ),
        'menu_icon'          => 'dashicons-admin-home',
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'show_in_rest'       => true,
        'query_var'          => true,
        'rewrite'            => [ 'slug' => 'kohteet' ],
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => true,
        'menu_position'      => 2,
        'supports'           => [ 'title', 'editor', 'thumbnail', 'page-attributes', 'revisions', 'excerpt' ],
    ];

    register_post_type( 'house', $args );

    // House category.
    $tax_labels = [
        'name'          => __( 'Kategoriat', 'kala' ),
        'singular_name' => __( 'Kategoria', 'kala' ),
    ];

    $tax_args = [
        'hierarchical'      => true,
        'labels'            => $tax_labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'show_in_rest'      => true,
        'rewrite'           => [ 'slug' => 'kohteen-kategoria' ],
    ];

    register_taxonomy( 'house-category', [ 'house' ], $tax_args );

    // House price category.
    $tax_labels = [
        'name'          => __( 'Hinta &euro;', 'kala' ),
        'singular_name' => __( 'Hinta &euro;', 'kala' ),
    ];

    $tax_args = [
        'hierarchical'      => true,
        'labels'            => $tax_labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'show_in_rest'      => true,
        'rewrite'           => [ 'slug' => 'kohteen-hinta-kategoria' ],
    ];

    register_taxonomy( 'house-price-category', [ 'house' ], $tax_args );

    // House cash flow range.
    $tax_labels = [
        'name'          => __( 'Kassavirta / kk', 'kala' ),
        'singular_name' => __( 'Kassavirta / kk', 'kala' ),
    ];

    $tax_args = [
        'hierarchical'      => true,
        'labels'            => $tax_labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'show_in_rest'      => true,
        'rewrite'           => [ 'slug' => 'kohteen-kassavirta' ],
    ];

    register_taxonomy( 'house-cash-flow', [ 'house' ], $tax_args );

    // House rental income range.
    $tax_labels = [
        'name'          => __( 'Vuokratuotto &#37;', 'kala' ),
        'singular_name' => __( 'Vuokratuotto &#37;', 'kala' ),
    ];

    $tax_args = [
        'hierarchical'      => true,
        'labels'            => $tax_labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'show_in_rest'      => true,
        'rewrite'           => [ 'slug' => 'kohteen-vuokratuotto' ],
    ];

    register_taxonomy( 'house-rental-income', [ 'house' ], $tax_args );

    // House type (yksiö, kaksio).
    $tax_labels = [
        'name'          => __( 'Huoneita', 'kala' ),
        'singular_name' => __( 'Huoneita', 'kala' ),
    ];

    $tax_args = [
        'hierarchical'      => true,
        'labels'            => $tax_labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'show_in_rest'      => true,
        'rewrite'           => [ 'slug' => 'kohteen-tyyppi' ],
    ];

    register_taxonomy( 'house-type', [ 'house' ], $tax_args );

    // House status.
    $tax_labels = [
        'name'          => __( 'Sijainti', 'kala' ),
        'singular_name' => __( 'Sijainti', 'kala' ),
    ];

    $tax_args = [
        'hierarchical'      => true,
        'labels'            => $tax_labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'show_in_rest'      => true,
        'rewrite'           => [ 'slug' => 'kohteen-kaupunki' ],
    ];

    register_taxonomy( 'house-city', [ 'house' ], $tax_args );

    // House status.
    $tax_labels = [
        'name'          => __( 'Status', 'kala' ),
        'singular_name' => __( 'Status', 'kala' ),
    ];

    $tax_args = [
        'hierarchical'      => true,
        'labels'            => $tax_labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'show_in_rest'      => true,
        'rewrite'           => [ 'slug' => 'kohteen-status' ],
    ];

    register_taxonomy( 'house-status', [ 'house' ], $tax_args );

    // Persons.
    $labels = [
        'name'                  => __( 'Henkilöt', 'kala' ),
        'singular_name'         => __( 'Henkilö', 'kala' ),
        'add_new'               => __( 'Lisää uusi henkilö', 'kala' ),
        'edit_item'             => __( 'Muokkaa henkilöä', 'kala' ),
        'search_items'          => __( 'Etsi henkilöitä', 'kala' ),
        'featured_image'        => __( 'Henkilön kuva', 'kala' ),
        'set_featured_image'    => __( 'Aseta henkilön kuva', 'kala' ),
        'remove_featured_image' => __( 'Poista henkilön kuva', 'kala' ),
        'item_published'        => __( 'Henkilö julkaistu', 'kala' ),
        'item_trashed'          => __( 'Henkilö julkaistu', 'kala' ),
        'item_updated'          => __( 'Henkilö on päivitetty', 'kala' ),
        'item_link'             => __( 'Henkilön linkki', 'kala' ),
        'item_link_description' => __( 'Linkki henkilöön', 'kala' ),

    ];

    $args = [
        'labels'             => $labels,
        'description'        => __( 'Henkilöt.', 'kala' ),
        'menu_icon'          => 'dashicons-admin-users',
        'public'             => false,
        'publicly_queryable' => false,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'show_in_rest'       => true,
        'query_var'          => true,
        'rewrite'            => [ 'slug' => 'henkilöt' ],
        'capability_type'    => 'post',
        'has_archive'        => false,
        'hierarchical'       => false,
        'menu_position'      => null,
        'supports'           => [ 'title', 'thumbnail' ],
    ];

    register_post_type( 'person', $args );

    // https://codex.wordpress.org/Function_Reference/register_taxonomy
    $tax_labels = [
        'name'          => __( 'Henkilöiden kategoriat', 'kala' ),
        'singular_name' => __( 'Henkilön kategoria', 'kala' ),
    ];

    $tax_args = [
        'hierarchical'      => true,
        'labels'            => $tax_labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'show_in_rest'      => true,
        'rewrite'           => [ 'slug' => 'henkilö-kategoria' ],
    ];

    register_taxonomy( 'person-category', [ 'person' ], $tax_args );
}
add_action( 'init', __NAMESPACE__ . '\add_post_types' );
