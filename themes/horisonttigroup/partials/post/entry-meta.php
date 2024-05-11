<?php
/**
 * Partial for displaying the entry meta for the post.
 * If you need to remove links from the categories, you can do it like this:
 * $entry_categories = wp_strip_all_tags( $entry_categories );
 *
 * @package Kala
 */

$taxonomy_slug = ! empty( $args['taxonomy'] ) ? $args['taxonomy'] : 'category';
?>

<div class="entry__meta width-medium">
    <?php if ( is_singular( 'post' ) ) : ?>
        <div class="entry__meta-meta">
            <span class="entry__meta-date"><?php Kala\date_with_time_tag(); ?></span>
        </div>
    <?php endif; ?>

    <?php
        get_template_part(
            'partials/post/card-item-taxonomy',
            '',
            [
                'taxonomy' => $taxonomy_slug,
            ]
        );
    ?>
</div>
