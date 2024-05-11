/* eslint-disable jsdoc/require-param-type */
/* eslint-disable no-unused-vars */
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

import ServerSideRender from '@wordpress/server-side-render';

import metadata from './block.json';
import Sidebar from './components/sidebar';

const { name } = metadata;

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

    const classes = classNames( {
        'house-info-editor': true,
        'margin-top-small': true,
        alignwide: true,
    } );

    const blockProps = useBlockProps( {
        className: classes,
    } );

    return (
        <div { ...blockProps }>
            <ServerSideRender
                block={ name }
                attributes={ attributes }
                className="articles-auto-grid__items-editor"
            />
            <Sidebar { ...props } />
        </div>
    );
}
