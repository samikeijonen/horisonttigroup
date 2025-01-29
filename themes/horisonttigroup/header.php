<?php get_template_part( 'partials/header/head' ); ?>

<body <?php body_class(); ?>>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KT4HZXWQ"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->

    <?php wp_body_open(); ?>

    <a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'kala' ); ?></a>

    <header class="site-header side-padding js-site-header">
        <nav class="mx-auto width-wide site-header__container">

            <div class="site-header__title">
                <a class="site-header__title-anchor" href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
                    <img alt="" width="337" height="113" src="<?php echo esc_url( get_theme_file_uri() . '/images/icons/logo-sijoitusasuntovahti.png' ); ?>" />
                    <span class="screen-reader-text"><?php bloginfo( 'name' ); ?></span>
                </a>

                <button class="site-nav__toggle js-site-nav-toggle">
                    <span class="screen-reader-text"><?php esc_html_e( 'Valikko', 'kala' ); ?></span>
                    <span class="site-nav__toggle-inner" aria-hidden="true">
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </button>
            </div>

            <div class="site-nav__wrapper animated js-site-nav-items">
                <?php if ( has_nav_menu( 'main_menu' ) ) : ?>
                    <?php wp_nav_menu(
                        [
                            'theme_location' => 'main_menu',
                            'menu_class'     => 'site-nav__items site-nav__items--main',
                            'container'      => false,
                        ]
                    );
                endif;

                if ( has_nav_menu( 'secondary_menu' ) ) :
                    wp_nav_menu(
                        [
                            'theme_location' => 'secondary_menu',
                            'menu_class'     => 'site-nav__items site-nav__items--secondary-mobile',
                            'container'      => false,
                            'depth'          => 1,
                        ]
                    );
                endif;
            ?>
            </div>
            <?php
                if ( has_nav_menu( 'secondary_menu' ) ) :
                    wp_nav_menu(
                        [
                            'theme_location' => 'secondary_menu',
                            'menu_class'     => 'site-nav__items site-nav__items--secondary-desktop',
                            'container'      => false,
                            'depth'          => 1,
                        ]
                    );
                endif;
            ?>
        </nav>
    </header>

    <main id="content" class="site-main side-padding">
