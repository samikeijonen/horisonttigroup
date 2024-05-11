/* eslint-disable jsdoc/require-param-type */
import classNames from 'classnames';
import {
    InnerBlocks,
    useBlockProps,
    useInnerBlocksProps,
} from '@wordpress/block-editor';

import Sidebar from './components/sidebar';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param  props
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( props ) {
    const {
        attributes: { columnCount, gap },
    } = props;

    const ALLOWED_BLOCKS = [ 'core/column' ];

    const TEMPLATE = [
        [ 'core/column', {} ],
        [ 'core/column', {} ],
    ];

    const classes = classNames( {
        'auto-grid-block': true,
        'margin-top-default': true,
        alignwide: true,
    } );

    const containerClasses = classNames( {
        'auto-grid-block__container': true,
        'grid-auto': true,
        [ `has-${ columnCount }-columns` ]: true,
        [ `has-${ gap }` ]: true,
    } );

    const blockProps = useBlockProps( {
        className: classes,
    } );

    const innerBlocksProps = useInnerBlocksProps(
        {
            className: containerClasses,
        },
        {
            allowedBlocks: ALLOWED_BLOCKS,
            template: TEMPLATE,
            renderAppender: InnerBlocks.ButtonBlockAppender,
        }
    );

    return (
        <div { ...blockProps }>
            <div { ...innerBlocksProps }></div>
            <Sidebar { ...props } />
        </div>
    );
}
