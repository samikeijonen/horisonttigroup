<?php
/**
 * Partial for displaying the card item.
 *
 * @package Kala
 */

$item_id       = ! empty( $args['item_id'] ) ? $args['item_id'] : get_the_ID();
$taxonomy_slug = ! empty( $args['taxonomy'] ) ? $args['taxonomy'] : 'category';
$show_excerpt  = ! empty( $args['show_excerpt'] ) ? $args['show_excerpt'] : false;
?>
<article id="card-<?php echo esc_attr( $item_id ); ?>" <?php post_class( 'card-item' ); ?>>
    <?php if ( has_post_thumbnail( $item_id ) ) : ?>
        <figure class="card-item__image aspect-ratio">
            <?php echo get_the_post_thumbnail( $item_id, 'medium_large' ); ?>
        </figure>
    <?php endif; ?>

    <div class="card-item__content margin-top-children margin-top-children--xs">
        <h3 class="card-item__title h4">
            <a href="<?php the_permalink( $item_id ); ?>" rel="bookmark" class="card-item__link is-absolute-link">
                <?php echo esc_html( get_the_title( $item_id ) ); ?>
            </a>
        </h3>

        <?php if ( $show_excerpt ) : ?>
            <p class="card-item__excerpt"><?php echo esc_html( get_the_excerpt( $item_id ) ); ?></p>
        <?php endif; ?>

        <?php
            get_template_part(
                'partials/post/card-item-taxonomy',
                '',
                [
                    'item_id'  => $item_id,
                    'taxonomy' => $taxonomy_slug,
                ]
            );
        ?>
    </div>
</article>
