/* eslint-disable react-hooks/rules-of-hooks */
import classNames from 'classnames';

const { useInnerBlocksProps, useBlockProps } = wp.blockEditor;

const ALLOWED_BLOCKS = [ 'core/video', 'core/image', 'core/embed' ];

const TEMPLATE = [ [ 'core/image', {} ] ];

export default function Edit( props ) {
    const {} = props;

    const classes = classNames( {
        'media-content-item': true,
        'media-content-item--media': true,
    } );

    const blockProps = useBlockProps( {
        className: classes,
    } );

    const innerBlocksProps = useInnerBlocksProps(
        {
            className: 'media-content-item__content margin-top-children',
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
