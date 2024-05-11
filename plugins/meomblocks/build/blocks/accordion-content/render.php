<?php

namespace MEOM\Blocks;

$block_title = attr( 'title', $attributes, '' );

if ( $content ) :
    $wrapper_attributes = get_block_wrapper_attributes( [ 'class' => 'accordion__content accordion-content ' ] );
    ?>

    <button class="accordion__header accordion-header" type="button">
        <span class="accordion__title">
            <?php echo wp_kses_post( $block_title ); ?>
        </span>
        <svg class="icon icon--md accordion__button-icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M17.5 11.6L12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z"></path></svg>
    </button>

    <div <?php echo $wrapper_attributes; // phpcs:ignore ?>>
        <div class="accordion__content-inner margin-top-children">
            <?php echo do_blocks( $content ); // phpcs:ignore ?>
        </div>
    </div>
<?php endif;
