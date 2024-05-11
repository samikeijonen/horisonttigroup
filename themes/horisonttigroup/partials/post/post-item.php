<?php
/**
 * Partial for displaying the post item.
 *
 * @package Kala
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class( 'post-item' ); ?>>
    <?php if ( has_post_thumbnail() ) : ?>
        <figure class="post-item__image"><?php the_post_thumbnail( 'medium' ); ?></figure>
    <?php endif;
    get_template_part( 'partials/post/entry-meta' ); ?>
    <h3 class="post-item__title">
        <a href="<?php the_permalink(); ?>" rel="bookmark" class="post-item__link">
            <?php the_title(); ?>
        </a>
    </h3>
    <?php the_excerpt(); ?>
</article>
