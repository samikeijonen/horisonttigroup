<?php

namespace MEOM\Blocks;

$class_names = [
    'house-extra-info',
];

$wrapper_attributes = get_block_wrapper_attributes( [ 'class' => implode( ' ', $class_names ) ] );?>
<div <?php echo $wrapper_attributes; // phpcs:ignore ?>>
    <?php
        $fields = [
            __( 'Osoite', 'meomblocks' )       => 'house_address',
            __( 'Huoneisto', 'meomblocks' )    => 'house_flat',
            __( 'Tyyppi', 'meomblocks' )       => 'house_type',
            __( 'Kerros', 'meomblocks' )       => 'house_which_floor',
            __( 'Pinta-ala', 'meomblocks' )    => 'house_area',
            __( 'Vuokra', 'meomblocks' )       => 'house_rent',
            __( 'Hoitovastike', 'meomblocks' ) => 'house_maintenance_charge',
            __( 'Tontti', 'meomblocks' )       => 'house_plot',
        ];
    ?>

    <figure class="wp-block-table house-extra-info__table">
        <table class="house-extra-info__items">
            <tbody>
                <?php
                    foreach ( $fields as $label => $field ) :
                        $value = get_field( $field );

                        if ( $value ) : ?>
                            <tr class="house-extra-info__item">
                                <th scope="row" class="house-extra-info__item-label">
                                    <?php echo wp_kses_post( $label ); ?>
                                </th>
                                <td class="house-extra-info__item-value">
                                    <?php echo esc_attr( $value ); ?>
                                    <?php if ( $field === 'house_rent' || $field === 'house_maintenance_charge' ) : ?>
                                        &euro;
                                    <?php elseif ( $field === 'house_area' ) : ?>
                                        m<sup>2</sup>
                                    <?php endif; ?>
                                </td>
                            </tr>
                        <?php endif;
                    endforeach;
                    ?>
                    <tr class="house-extra-info__item">
                        <th scope="row" class="house-extra-info__item-label">
                            <?php esc_html_e( 'Status', 'meomblocks' ); ?>
                        </th>
                        <td class="house-extra-info__item-value">
                            <?php
                                get_template_part(
                                    'partials/post/card-item-taxonomy',
                                    '',
                                    [
                                        'item_id'    => get_the_ID(),
                                        'taxonomy'   => 'house-status',
                                        'strip_tags' => true,
                                    ]
                                );
                            ?>
                        </td>
                    </tr>
            </tbody>
        </table>
    </figure>
</div>
<?php
