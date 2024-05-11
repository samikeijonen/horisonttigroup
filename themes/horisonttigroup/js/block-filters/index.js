wp.hooks.addFilter(
    'blocks.registerBlockType',
    'meom/alignwide',
    ( settings, name ) => {
        if ( name === 'core/paragraph' ) {
            return {
                ...settings,
                supports: {
                    ...settings.supports,
                    align: [ 'wide' ],
                },
            };
        }
        return settings;
    }
);
