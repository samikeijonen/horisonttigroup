wp.domReady( () => {
    // Register block variations.
    wp.blocks.registerBlockVariation( 'core/image', {
        name: 'meom/icon-with-borders',
        title: 'Ikoni reunaviivoilla',
        description: 'Ikoni on hyvä olla 1:1, esim. 24px x 24px.',
        attributes: {
            className: 'meom-icon-with-borders',
        },
    } );

    wp.blocks.registerBlockVariation( 'core/image', {
        name: 'meom/icon-with-background',
        title: 'Ikoni taustavärillä',
        description: 'Ikoni on hyvä olla 1:1, esim. 800px x 800px.',
        attributes: {
            className: 'meom-icon-with-background',
        },
    } );
} );
