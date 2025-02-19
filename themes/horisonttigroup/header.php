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
            <?php
            // Get the current domain
            $current_domain = $_SERVER['HTTP_HOST'];

            // Set the logo URL based on the part of the domain
            if ( strpos( $current_domain, 'horisonttigroup' ) !== false ) :
                $logo_url    = get_theme_file_uri() . '/images/icons/logo-white.svg';
                $logo_width  = 120;
                $logo_height = 64;
                $logo_class  = 'horisonttigroup';
            else :
                $logo_url    = get_theme_file_uri() . '/images/icons/logo-sijoitusasuntovahti.png';
                $logo_width  = 337;
                $logo_height = 113;
                $logo_class  = 'sijoitusasuntovahti';
            endif;
            ?>
                <a class="site-header__title-anchor" href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
                    <img class="site-header__title-anchor-img site-header__title-anchor-img--<?php echo esc_attr( $logo_class ); ?>" alt="" width="<?php echo esc_attr( $logo_width ); ?>" height="<?php echo esc_attr( $logo_height ); ?>" src="<?php echo esc_url( $logo_url ); ?>" />
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
