import classNames from 'classnames';

import { __ } from '@wordpress/i18n';
import { Placeholder } from '@wordpress/components';
import { useBlockProps } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';

import Sidebar from './components/sidebar';
import PostItemPicker from './components/PostItemPicker';

import metadata from './block.json';

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
 * @param {Object} props
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( props ) {
    const {
        attributes,
        attributes: { postId },
    } = props;

    const classes = classNames( {
        'card-editor-item': true,
    } );

    const blockProps = useBlockProps( { className: classes } );

    return (
        <div { ...blockProps }>
            <Sidebar { ...props } />

            { ! postId && (
                <Placeholder
                    label={ __( 'Valitse kohde', 'meomblocks' ) }
                    instructions={ __(
                        'Voit vaihtaa valintaa myöhemmin lohkon asetuksista sivupalkista.',
                        'meomblocks'
                    ) }
                >
                    <PostItemPicker { ...props } />
                </Placeholder>
            ) }

            { postId && (
                <ServerSideRender
                    block={ name }
                    attributes={ attributes }
                    className="card-item__editor"
                />
            ) }
        </div>
    );
}
