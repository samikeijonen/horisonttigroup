import { __ } from '@wordpress/i18n';
import { PanelBody, ToggleControl } from '@wordpress/components';

import { InspectorControls } from '@wordpress/block-editor';

const Sidebar = ( props ) => {
    const {
        attributes: { imageFirstMobile },
        setAttributes,
    } = props;

    return (
        <InspectorControls>
            <PanelBody
                title={ __( 'Asetukset', 'meomblocks' ) }
                initialOpen={ true }
            >
                <ToggleControl
                    label={ __(
                        'Näytä kuva mobiilissa ensimmäisenä',
                        'meomblocks'
                    ) }
                    checked={ imageFirstMobile }
                    onChange={ ( value ) =>
                        setAttributes( {
                            imageFirstMobile: value,
                        } )
                    }
                />
            </PanelBody>
        </InspectorControls>
    );
};

export default Sidebar;
