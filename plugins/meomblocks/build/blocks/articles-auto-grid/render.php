<?php

namespace MEOM\Blocks;

$term_id = attr( 'termId', $attributes, null );

// Arguments.
$args = [
    'posts_per_page'         => 3,
    'post_type'              => 'post',
    'no_found_rows'          => true,
    'update_post_meta_cache' => false,
    'update_post_term_cache' => false,
];

if ( $term_id && $term_id !== 0 ) {
    $args['tax_query'] = [
        [
            'taxonomy' => 'category',
            'field'    => 'id',
            'terms'    => absint( $term_id ),
        ],
    ];
}

$latest_posts = new \WP_Query( $args );

$class_names = [
    'articles-auto-grid',
    'margin-top-default',
    'alignwide',
];

$container_class_names = [
    'articles-manual-grid__container',
    'grid-auto',
];

$wrapper_attributes = get_block_wrapper_attributes( [ 'class' => implode( ' ', $class_names ) ] );?>
<div <?php echo $wrapper_attributes; // phpcs:ignore ?>>
    <div class="<?php echo esc_attr( implode( ' ', $container_class_names ) ); ?>">
        <?php
            if ( $latest_posts->have_posts() ) {
                while ( $latest_posts->have_posts() ) {
                    $latest_posts->the_post();

                    get_template_part(
                        'partials/post/card-item',
                        '',
                        [
                            'item_id'      => get_the_ID(),
                            'show_excerpt' => true,
                        ]
                    );
                }
            }
        ?>
    </div>
</div>
<?php
wp_reset_postdata();

