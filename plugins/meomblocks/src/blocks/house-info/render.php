<?php

namespace MEOM\Blocks;

$show_in_grid = attr( 'showInGrid', $attributes, true );

$class_names = [
    'house-info',
    'margin-top-small',
    'alignwide',
];

$container_class_names = [
    'house-info__container',
    'grid-auto',
    'has-4-columns',
    ! $show_in_grid ? 'has-1-columns' : '',
];

$wrapper_attributes = get_block_wrapper_attributes( [ 'class' => implode( ' ', $class_names ) ] );?>
<div <?php echo $wrapper_attributes; // phpcs:ignore ?>>
    <div class="<?php echo esc_attr( implode( ' ', $container_class_names ) ); ?>">
        <?php
            $fields = [
                __( 'Velaton hinta', 'meomblocks' )   => 'house_price',
                __( 'Myyntihinta', 'meomblocks' )     => 'house_price_sell',
                __( 'Kassavirta / kk', 'meomblocks' ) => 'house_cash_flow',
                __( 'Vuokratuotto', 'meomblocks' )    => 'house_income_procent',
            ];

            foreach ( $fields as $label => $field ) :
                $value = get_field( $field );

                if ( $value ) : ?>
                    <p class="house-info__item">
                        <span class="house-info__item-label">
                            <?php echo wp_kses_post( $label ); ?>
                        </span>
                        <span class="house-info__item-value h3">
                            <?php echo esc_attr( $value ); ?>
                            <?php if ( $field === 'house_price' || $field === 'house_price_sell' || $field === 'house_cash_flow' ) : ?>
                                &euro;
                            <?php elseif ( $field === 'house_income_procent' ) : ?>
                                &#37;
                            <?php endif; ?>
                        </span>
                    </p>
                <?php endif;
            endforeach;
        ?>
    </div>
</div>
<?php
