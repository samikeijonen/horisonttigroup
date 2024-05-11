<?php

namespace MEOM\Blocks;

if ( $content ) :
    $wrapper_attributes = get_block_wrapper_attributes( [ 'class' => 'media-content-item media-content-item--media' ] );
    ?>
    <div <?php echo $wrapper_attributes; // phpcs:ignore ?>>
        <div class="media-content-item__content margin-top-children" data-animated="animated">
            <?php echo do_blocks( $content ); // phpcs:ignore ?>
        </div>
    </div>
<?php endif;
