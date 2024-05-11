<?php
namespace MEOM\Blocks;

$wrapper_attributes = get_block_wrapper_attributes( [ 'class' => 'accordion js-accordion' ] );
?>

<div <?php echo $wrapper_attributes; //phpcs:ignore; ?>>
    <?php echo do_blocks( $content ); //phpcs:ignore; ?>
</div>
