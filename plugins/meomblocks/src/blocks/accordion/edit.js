/* eslint-disable react-hooks/rules-of-hooks */
import classNames from 'classnames';

const { InnerBlocks, useBlockProps, useInnerBlocksProps } = wp.blockEditor;

import './editor.scss';

const ALLOWED_BLOCKS = [ 'meomblocks/accordion-content' ];

const TEMPLATE = [
    [ 'meomblocks/accordion-content' ],
    [ 'meomblocks/accordion-content' ],
];

export default function Edit( props ) {
    const {
        attributes: {},
    } = props;

    const classes = classNames( {
        accordion: true,
    } );

    const blockProps = useBlockProps( {
        className: classes,
    } );

    const innerBlocksProps = useInnerBlocksProps( blockProps, {
        allowedBlocks: ALLOWED_BLOCKS,
        template: TEMPLATE,
        renderAppender: InnerBlocks.ButtonBlockAppender,
    } );

    return <div { ...innerBlocksProps }></div>;
}
