<?php

namespace MEOM\Blocks;

$column_count = attr( 'columnCount', $attributes, 3 );
$gap          = attr( 'gap', $attributes, 'gap-default' );

if ( $content ) :

    $class_names = [
        'auto-grid-block',
        'margin-top-default',
        'alignwide',
    ];

    $container_class_names = [
        'auto-grid-block__container',
        'grid-auto',
        'has-' . absint( $column_count ) . '-columns ',
        'has-' . esc_attr( $gap ),
    ];

    $wrapper_attributes = get_block_wrapper_attributes( [ 'class' => implode( ' ', $class_names ) ] );
    ?>
    <div <?php echo $wrapper_attributes; // phpcs:ignore ?>>
        <div class="<?php echo esc_attr( implode( ' ', $container_class_names ) ); ?>">
            <?php echo do_blocks( $content ); // phpcs:ignore ?>
        </div>
    </div>
<?php endif;
