import classNames from 'classnames';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

import Sidebar from './components/sidebar';

import { ImageSelect } from '@meom/block-components';

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
        attributes: { image, imageFirstMobile },
        setAttributes,
    } = props;

    const ALLOWED_BLOCKS = [
        'core/heading',
        'core/paragraph',
        'core/buttons',
        'yoast-seo/breadcrumbs',
    ];
    const TEMPLATE = [
        [
            'core/heading',
            { level: 1, placeholder: 'Ytimekäs otsikko muutamalla sanalla' },
        ],
    ];

    const classes = classNames( {
        hero: true,
        'width-full': true,
        'margin-top-default': true,
        'has-background': true,
        'has-hg-grey-black-background-color': true,
        'side-padding': true,
        'has-image-first-mobile': imageFirstMobile,
    } );

    const blockProps = useBlockProps( { className: classes } );

    const contentClasses = classNames( {
        hero__content: true,
        'margin-top-children': true,
        'width-medium': true,
    } );

    const innerBlocksProps = useInnerBlocksProps(
        {
            className: contentClasses,
        },
        {
            allowedBlocks: ALLOWED_BLOCKS,
            template: TEMPLATE,
        }
    );

    return (
        <div { ...blockProps }>
            <Sidebar { ...props } />
            <div className={ `hero__container mx-auto alignwide` }>
                <div { ...innerBlocksProps }></div>
                <figure className="hero__image aspect-ratio aspect-ratio--1-1">
                    <ImageSelect
                        image={ image }
                        class={ 'is-cover-img' }
                        onChange={ ( imageNew ) =>
                            setAttributes( { image: imageNew } )
                        }
                    />
                </figure>
            </div>
        </div>
    );
}
