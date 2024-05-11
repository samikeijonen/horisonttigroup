/* eslint-disable react-hooks/rules-of-hooks */
import classNames from 'classnames';

import { _x } from '@wordpress/i18n';
const { RichText, useInnerBlocksProps, useBlockProps } = wp.blockEditor;

import './editor.scss';

export default function Edit( props ) {
    const { attributes, setAttributes } = props;
    const { title } = attributes;

    const classes = classNames( {
        accordion__editor: true,
    } );

    const blockProps = useBlockProps( {
        className: classes,
    } );

    const innerBlocksProps = useInnerBlocksProps(
        {
            className: 'accordion__content-inner margin-top-children',
        },
        {}
    );

    function IconArrow() {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                aria-hidden="true"
                className="icon icon--md accordion__button-icon"
                viewBox="0 0 24 24"
            >
                <path d="M17.5 11.6L12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z"></path>
            </svg>
        );
    }

    return (
        <div { ...blockProps }>
            <div className="accordion__header accordion__header__button accordion-header">
                <RichText
                    tagName="span"
                    multiline={ false }
                    value={ title }
                    className={ `accordion__title` }
                    onChange={ ( newTitle ) =>
                        setAttributes( { title: newTitle } )
                    }
                    placeholder={ _x(
                        'Haitarin otsikko',
                        'Placeholder for accordion title',
                        'meomblocks'
                    ) }
                />
                <IconArrow />
            </div>

            <div { ...innerBlocksProps }></div>
        </div>
    );
}
