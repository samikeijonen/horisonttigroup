import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';

import { InspectorControls } from '@wordpress/block-editor';

import { TermSelect } from '@meom/block-components';

const Sidebar = ( props ) => {
    return (
        <InspectorControls>
            <PanelBody
                title={ __( 'Asetukset', 'meomblocks' ) }
                initialOpen={ true }
            >
                <TermSelect taxonomyName="category" { ...props } />
            </PanelBody>
        </InspectorControls>
    );
};

export default Sidebar;
