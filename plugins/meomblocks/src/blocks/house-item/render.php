<?php
/**
 * Hero block render callback.
 */

namespace MEOM\Blocks;

$item_id = attr( 'postId', $attributes, null );

if ( ! $item_id ) {
    return;
}

$class_names = [
    'card-item',
    'card-item--house',
];

$wrapper_attributes = get_block_wrapper_attributes( [ 'class' => implode( ' ', $class_names ) ] );
?>
<?php
    get_template_part(
        'partials/post/house-item',
        '',
        [
            'item_id' => $item_id,
        ]
    );
