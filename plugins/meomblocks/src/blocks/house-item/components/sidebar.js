import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

import PostItemPicker from './PostItemPicker';

const Sidebar = ( props ) => {
    return (
        <InspectorControls>
            <PanelBody
                title={ __( 'Asetukset', 'meomblocks' ) }
                initalOpen={ true }
            >
                <PostItemPicker { ...props } />
            </PanelBody>
        </InspectorControls>
    );
};

export default Sidebar;
