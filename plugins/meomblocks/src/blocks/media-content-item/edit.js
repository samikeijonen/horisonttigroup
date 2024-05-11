/* eslint-disable react-hooks/rules-of-hooks */
import classNames from 'classnames';

const { useInnerBlocksProps, useBlockProps } = wp.blockEditor;

import './editor.scss';

const ALLOWED_BLOCKS = [
    'core/paragraph',
    'core/heading',
    'core/buttons',
    'core/list',
];

const TEMPLATE = [
    [ 'core/heading', { level: 2 } ],
    [ 'core/paragraph', {} ],
    [ 'core/buttons', {}, [ [ 'core/button' ] ] ],
];

export default function Edit( props ) {
    const {} = props;

    const classes = classNames( {
        'media-content-item': true,
        'media-content-item--content': true,
    } );

    const blockProps = useBlockProps( {
        className: classes,
    } );

    const innerBlocksProps = useInnerBlocksProps(
        {
            className:
                'media-content-item__content margin-top-children width-medium',
        },
        {
            allowedBlocks: ALLOWED_BLOCKS,
            template: TEMPLATE,
        }
    );

    return (
        <div { ...blockProps }>
            <div { ...innerBlocksProps }></div>
        </div>
    );
}
