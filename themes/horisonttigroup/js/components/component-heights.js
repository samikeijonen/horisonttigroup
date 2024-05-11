export default function componentHeights() {
    const siteHeader = document.querySelector( '.site-header' );

    if ( siteHeader ) {
        const siteHeaderHeight = siteHeader.offsetHeight + 'px';

        document.documentElement.style.setProperty(
            '--site-header-height',
            siteHeaderHeight
        );
    }

    const faultMessages = document.querySelector( '.fault-messages-js' );

    if ( faultMessages ) {
        const faultMessagesHeight = faultMessages.offsetHeight + 'px';

        document.documentElement.style.setProperty(
            '--fault-messages-height',
            faultMessagesHeight
        );
    }
}
