<?php
/**
 * Partial for displaying the entry terms for the post.
 *
 * @package Kala
 */

$taxonomy_slug = ! empty( $args['taxonomy'] ) ? $args['taxonomy'] : 'category';
$item_id       = ! empty( $args['item_id'] ) ? $args['item_id'] : get_the_id();

$terms = get_the_term_list( absint( $item_id ), esc_attr( $taxonomy_slug ), '', '', '' );

$strip_tags = ! empty( $args['strip_tags'] ) ? $args['strip_tags'] : false;

if ( ! $terms ) :
    return;
endif;
?>
<div class="card-item__taxonomy card-item__taxonomy--<?php echo esc_attr( $taxonomy_slug ); ?>">
    <?php echo wp_kses_post( $strip_tags ? wp_strip_all_tags( $terms ) : $terms ); ?>
</div>
