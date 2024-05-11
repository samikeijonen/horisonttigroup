import { __ } from '@wordpress/i18n';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

const Sidebar = ( props ) => {
    const {
        attributes: { showInGrid },
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
                        'Näytä tiedot vieräkkäin (grid)',
                        'meomblocks'
                    ) }
                    checked={ showInGrid }
                    onChange={ ( value ) =>
                        setAttributes( {
                            showInGrid: value,
                        } )
                    }
                />
            </PanelBody>
        </InspectorControls>
    );
};

export default Sidebar;
