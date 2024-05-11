<?php
/**
 * Partial for displaying the house item.
 *
 * @package Kala
 */

$item_id       = ! empty( $args['item_id'] ) ? $args['item_id'] : get_the_ID();
$taxonomy_slug = ! empty( $args['taxonomy'] ) ? $args['taxonomy'] : 'category';

$card_title     = get_field( 'house_card_title', $item_id );
$typeh          = get_field( 'house_type', $item_id );
$price          = get_field( 'house_price', $item_id );
$cash_flow      = get_field( 'house_cash_flow', $item_id );
$income_procent = get_field( 'house_income_procent', $item_id );
?>
<article id="card-<?php echo esc_attr( $item_id ); ?>" <?php post_class( 'card-item card-item--house' ); ?>>
    <?php if ( has_post_thumbnail( $item_id ) ) : ?>
        <figure class="card-item__image aspect-ratio aspect-ratio--3-2">
            <?php echo get_the_post_thumbnail( $item_id, 'medium_large' ); ?>
        </figure>
    <?php endif; ?>

    <div class="card-item__content margin-top-children margin-top-children--xs">
        <h3 class="card-item__title">
            <a href="<?php the_permalink( $item_id ); ?>" rel="bookmark" class="card-item__link is-absolute-link">
                <span class="card-item__subtitle">
                    <?php if ( $typeh ) : ?>
                        <span class="card-item__house-value"><?php echo esc_attr( $typeh ); ?></span>
                    <?php endif; ?>
                    &middot;
                    <?php
                        get_template_part(
                            'partials/post/card-item-taxonomy',
                            '',
                            [
                                'item_id'    => $item_id,
                                'taxonomy'   => 'house-city',
                                'strip_tags' => true,
                            ]
                        );
                    ?>
                    &middot;
                    <?php
                        get_template_part(
                            'partials/post/card-item-taxonomy',
                            '',
                            [
                                'item_id'    => $item_id,
                                'taxonomy'   => 'house-status',
                                'strip_tags' => true,
                            ]
                        );
                    ?>
                </span>
                <?php echo esc_html( $price ); ?> &euro;
            </a>
        </h3>

        <?php if ( $card_title ) : ?>
            <p class="card-item__house-card-title">
                <?php echo esc_html( $card_title ); ?>
            </p>
        <?php endif; ?>
    </div>

    <div class="card-item__house-info">
        <?php if ( $cash_flow ) : ?>
            <p class="card-item__house-item">
                <span class="card-item__subtitle"><?php esc_html_e( 'Kassavirta', 'kala' ); ?></span>
                <span class="card-item__house-value h4"><?php echo esc_attr( $cash_flow ); ?> &euro;</span>
            </p>
        <?php endif; ?>

        <?php if ( $income_procent ) : ?>
            <p class="card-item__house-item">
                <span class="card-item__subtitle"><?php esc_html_e( 'Vuokratuotto', 'kala' ); ?></span>
                <span class="card-item__house-value h4"><?php echo esc_attr( $income_procent ); ?> &#37;</span>
            </p>
        <?php endif; ?>
    </div>
</article>
