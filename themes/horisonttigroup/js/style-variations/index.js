wp.domReady( () => {
    // Unregister button style
    wp.blocks.unregisterBlockStyle( 'core/button', 'squared' );
    wp.blocks.unregisterBlockStyle( 'core/button', 'fill' );

    // Unregister quote styles.
    wp.blocks.unregisterBlockStyle( 'core/quote', 'plain' );

    // Unregister table styles.
    wp.blocks.unregisterBlockStyle( 'core/table', 'stripes' );

    // Register list styles.
    wp.blocks.registerBlockStyle( 'core/list', {
        name: 'list-reset',
        label: 'Resetoi lista',
    } );

    // Register list styles.
    wp.blocks.registerBlockStyle( 'core/list', {
        name: 'list-checkmark',
        label: 'Checkmark-lista',
    } );

    wp.blocks.registerBlockStyle( 'core/list', {
        name: 'list-checkmark-center',
        label: 'Checkmark-lista teksti keskellä',
    } );

    // Register columns styles.
    wp.blocks.registerBlockStyle( 'core/column', {
        name: 'column-sticky',
        label: 'Kiinnittyy yläreunaan',
    } );

    // Register group styles.
    wp.blocks.registerBlockStyle( 'core/group', {
        name: 'group-borders',
        label: 'Reunaviivat',
    } );
} );
