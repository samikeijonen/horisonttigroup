<?php get_header();

$post_type_slug = get_post_type();
$taxonomy_slug  = 'category';

if ( $post_type_slug === 'reference' ) :
    $taxonomy_slug = 'reference-category';
endif;


while ( have_posts() ) :
    the_post(); ?>

    <article id="post-<?php the_ID(); ?>" <?php post_class( 'content-area entry' ); ?>>
        <div class="entry__header width-medium margin-top-children margin-top-children--xs">
            <?php
            if ( $post_type_slug === 'reference' ) :
                get_template_part(
                    'partials/post/card-item-taxonomy',
                    '',
                    [
                        'taxonomy' => $taxonomy_slug,
                    ]
                );
            endif;
            ?>

            <?php get_template_part(
                'partials/global/breadcrumbs',
                '',
                [
                    'hide_last_item' => true,
                ]
                );
            ?>

            <h1 class="entry__title"><?php the_title(); ?></h1>

            <?php
            get_template_part(
                'partials/post/entry-meta',
                '',
                [
                    'taxonomy' => $taxonomy_slug,
                ]
            );
            ?>
        </div>
        <?php
        if ( has_post_thumbnail() ) : ?>
            <figure class="entry__image width-medium"><?php the_post_thumbnail( 'large' ); ?></figure>
        <?php endif; ?>

        <?php the_content(); ?>
    </article>

<?php endwhile;
get_footer();
