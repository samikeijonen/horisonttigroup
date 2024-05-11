/* eslint-disable jsdoc/require-param-type */
import classNames from 'classnames';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
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
    const { attributes } = props;

    const ALLOWED_BLOCKS = [
        'meomblocks/media-content-media',
        'meomblocks/media-content-item',
    ];

    const TEMPLATE = [
        [ 'meomblocks/media-content-media', {} ],
        [ 'meomblocks/media-content-item', {} ],
    ];

    const classes = classNames( {
        'media-content': true,
        'margin-top-default': true,
        alignwide: true,
    } );

    const containerClasses = classNames( {
        'media-content__container': true,
        [ `has-media-position-${ attributes.mediaPosition }` ]: true,
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
            renderAppender: false,
        }
    );

    return (
        <div { ...blockProps }>
            <Sidebar { ...props } />
            <div { ...innerBlocksProps }></div>
        </div>
    );
}
