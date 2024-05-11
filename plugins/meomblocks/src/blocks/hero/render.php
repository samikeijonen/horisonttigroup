<?php
/**
 * Hero block render callback.
 */

namespace MEOM\Blocks;

use DateTime;
use DateTimeZone;

$image              = attr( 'image', $attributes, false );
$image_first_mobile = attr( 'imageFirstMobile', $attributes, false );
$image_id           = $image ? $image['id'] : false;

$class_names = [
    'hero',
    'width-full',
    'margin-top-default',
    'has-background',
    'has-hg-grey-black-background-color',
    'side-padding',
    $image_first_mobile ? 'has-image-first-mobile' : '',
];

$wrapper_attributes = get_block_wrapper_attributes( [ 'class' => implode( ' ', $class_names ) ] );
?>
<div <?php echo $wrapper_attributes; // phpcs:ignore ?>>
    <div class="hero__container mx-auto alignwide">
        <div class="hero__content margin-top-children width-medium">
            <?php echo do_blocks( $content ); // phpcs:ignore ?>
        </div>

        <?php if ( $image_id ) : ?>
            <figure class="hero__image aspect-ratio aspect-ratio--1-1">
                <?php echo wp_get_attachment_image( $image_id, 'full', '', [ 'loading' => 'eager' ] ); ?>
            </figure>
        <?php endif; ?>
    </div>
</div>
