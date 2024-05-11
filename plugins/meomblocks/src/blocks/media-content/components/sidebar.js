import { __ } from '@wordpress/i18n';
import { PanelBody, RadioControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

const Sidebar = ( props ) => {
    const { attributes, setAttributes } = props;

    return (
        <InspectorControls>
            <PanelBody
                title={ __( 'Asetukset', 'meomblocks' ) }
                initalOpen={ true }
            >
                <RadioControl
                    label={ __( 'Median sijainti', 'meomblocks' ) }
                    selected={ attributes.mediaPosition }
                    options={ [
                        {
                            label: __( 'Vasemmalla', 'meomblocks' ),
                            value: 'left',
                        },
                        {
                            label: __( 'Oikealla', 'meomblocks' ),
                            value: 'right',
                        },
                    ] }
                    onChange={ ( mediaPositionNew ) =>
                        setAttributes( { mediaPosition: mediaPositionNew } )
                    }
                />
            </PanelBody>
        </InspectorControls>
    );
};

export default Sidebar;
