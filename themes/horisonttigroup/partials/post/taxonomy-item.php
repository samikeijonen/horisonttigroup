<?php
/**
 * Partial for displaying desired terms.
 *
 * @var array $args             Array that gets data from partial usage. Uses term_id (int) and taxonomy (string).
 * @var integer $term_id        Taxonomy term id.
 * @var string $taxonomy_slug   Slug for get_term funtion, category as default.
 *
 * @package Kala
 */

$term_id       = ! empty( $args['term_id'] ) ? $args['term_id'] : null;
$taxonomy_slug = ! empty( $args['taxonomy'] ) ? $args['taxonomy'] : 'category';

$term_item = get_term( $term_id, $taxonomy_slug );

// Bail fast
if ( ! $term_item ) {
    return;
}

$queried_object  = get_queried_object();
$current_term_id = ( $queried_object && property_exists( $queried_object, 'term_id' ) ) ? $queried_object->term_id : null;
?>
<a href="<?php echo esc_url( get_term_link( $term_item ) ); ?>" <?php echo ( $term_item->term_id === $current_term_id ) ? 'aria-current="page"' : ''; ?>>
    <?php echo esc_html( $term_item->name ); ?>
</a>
