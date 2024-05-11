import { __ } from '@wordpress/i18n';
import { PanelBody, RadioControl, RangeControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

const Sidebar = ( props ) => {
    const {
        attributes: { columnCount, gap },
        setAttributes,
    } = props;

    return (
        <InspectorControls>
            <PanelBody
                title={ __( 'Asetukset', 'meomblocks' ) }
                initialOpen={ true }
            >
                <RangeControl
                    label={ __( 'Sarakkeiden määrä', 'meomblocks' ) }
                    value={ columnCount }
                    min={ 2 }
                    max={ 4 }
                    onChange={ ( newCount ) => {
                        setAttributes( { columnCount: newCount } );
                    } }
                />

                <RadioControl
                    label={ __( 'Sarakkeiden välinen välistys', 'meomblocks' ) }
                    selected={ gap }
                    options={ [
                        {
                            label: __( 'Oletus', 'meomblocks' ),
                            value: 'gap-default',
                        },
                        {
                            label: __(
                                'Enemmän välistystä pystysuunnassa',
                                'meomblocks'
                            ),
                            help: __(
                                'Hyödyllinen kun sarakkeissa on pääsääntöisesti tekstiä.',
                                'meomblocks'
                            ),
                            value: 'gap-more-vertical',
                        },
                        {
                            label: __(
                                'Enemmän välistystä sivusuunnassa',
                                'meomblocks'
                            ),
                            help: __(
                                'Hyödyllinen kun sarakkeissa on esim lomake ja henkilön kortti.',
                                'meomblocks'
                            ),
                            value: 'gap-more-horizontal',
                        },
                    ] }
                    onChange={ ( gapNew ) => setAttributes( { gap: gapNew } ) }
                />
            </PanelBody>
        </InspectorControls>
    );
};

export default Sidebar;
