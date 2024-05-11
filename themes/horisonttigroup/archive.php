<?php get_header(); ?>
<div class="content-area content-area--archive">
    <?php
    if ( is_home() ) :
        block_template_part( 'articles' );
    elseif ( is_post_type_archive( 'house' ) ) :
        block_template_part( 'houses' );
    else :
        ?>
        <div class="alignwide margin-top-children">
            <?php
                get_template_part( 'partials/global/breadcrumbs' );
                the_archive_title( '<h1 class="wp-block-heading width-medium">', '</h1>' );
                the_archive_description( '<div class="archive-description width-regular margin-top-children">', '</div>' );
            ?>
        </div>
    <?php endif;

    if ( have_posts() ) : ?>
        <div class="posts-list grid-auto alignwide">
            <?php while ( have_posts() ) {
                the_post();
                get_template_part(
                    get_post_type() === 'house' ? 'partials/post/house-item' : 'partials/post/card-item',
                    '',
                    [
                        'show_excerpt' => true,
                    ]
                );
            } ?>
        </div>

        <?php get_template_part( 'partials/global/pagination' ); ?>

    <?php else : ?>
        <p><?php esc_html_e( 'Valitettavasti artikkeleita ei löytynyt.', 'kala' ); ?></p>
    <?php endif; ?>
</div>

<?php get_footer();
