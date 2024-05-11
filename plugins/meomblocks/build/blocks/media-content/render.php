<?php

namespace MEOM\Blocks;

if ( $content ) :
    $media_position   = attr( 'mediaPosition', $attributes, 'left' );
    $container_class  = 'media-content__container';
    $container_class .= ' has-media-position-' . $media_position;

    $wrapper_attributes = get_block_wrapper_attributes( [ 'class' => 'media-content alignwide margin-top-default ' ] );
    ?>
    <div <?php echo $wrapper_attributes; // phpcs:ignore ?>>
        <div class="<?php echo esc_attr( $container_class ); ?> ">
            <?php echo do_blocks( $content ); // phpcs:ignore ?>
        </div>
    </div>
<?php endif;
