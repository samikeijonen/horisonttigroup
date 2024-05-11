<?php

namespace MEOM\Blocks;

$class_names = [
    'house-condition',
];

$wrapper_attributes = get_block_wrapper_attributes( [ 'class' => implode( ' ', $class_names ) ] );?>
<div <?php echo $wrapper_attributes; // phpcs:ignore ?>>
    <?php
        $fields = [
            __( 'Asunnon kuntopisteet keskiarvo', 'meomblocks' ) => 'house_condition_average',
            __( 'Asunnon pinnat keskiarvo', 'meomblocks' )       => 'house_surfaces_average',
            __( 'Keittiön kunto keskiarvo', 'meomblocks' )       => 'house_kitchen_average',
            __( 'Kylpyhuoneen kunto keskiarvo', 'meomblocks' )   => 'house_bathroom_average',
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
                                <th scope="row" class="house-extra-info__item-label"><?php echo esc_html( $label ); ?></th>
                                <td class="house-extra-info__item-value"><?php echo esc_attr( $value ); ?></td>
                            </tr>
                        <?php endif;
                    endforeach;
                ?>
            </tbody>
        </table>
    </figure>
</div>
<?php
