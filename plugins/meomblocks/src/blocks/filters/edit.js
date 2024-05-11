import classNames from 'classnames';

import { __, _x } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { Placeholder } from '@wordpress/components';

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
        attributes: { title },
        setAttributes,
    } = props;

    const classes = classNames( {
        'filters-wrapper': true,
        'margin-top-small': true,
        alignwide: true,
    } );

    const blockProps = useBlockProps( { className: classes } );

    return (
        <div { ...blockProps }>
            <RichText
                tagName="h2"
                multiline={ false }
                value={ title }
                className={ `filters__title h4` }
                onChange={ ( newTitle ) =>
                    setAttributes( { title: newTitle } )
                }
                allowedFormats={ [] }
                placeholder={ _x(
                    'Otsikko suodattimille',
                    'Placeholder suodattimien otsikolle.',
                    'meomblocks'
                ) }
            />
            <Placeholder
                label={ __(
                    'Kohteiden suodattimien placeholder.',
                    'meomblocks'
                ) }
            />
        </div>
    );
}
