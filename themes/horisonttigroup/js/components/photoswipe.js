/* global */
import PhotoSwipeLightbox from 'photoswipe/lightbox'; // eslint-disable-line

const photoSwipe = () => {
    // Add needed data attributes to images.
    const images = document.querySelectorAll( '.wp-block-gallery a' );
    for ( const image of images ) {
        // Get image height and width.
        const img = image.querySelector( 'img' );
        const imgHeight = img.getAttribute( 'height' );
        const imgWidth = img.getAttribute( 'width' );

        image.setAttribute( 'data-pswp-height', imgHeight );
        image.setAttribute( 'data-pswp-width', imgWidth );
    }

    const lightbox = new PhotoSwipeLightbox( {
        gallery: '.wp-block-gallery',
        children: 'a',
        pswpModule: () => import( 'photoswipe' ), // eslint-disable-line
    } );

    lightbox.init();
};

export default photoSwipe;
