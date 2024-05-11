<?php
/**
 * Hero block render callback.
 */

namespace MEOM\Blocks;

$filters_title = attr( 'title', $attributes, '' );

$class_names = [
    'filters-wrapper',
    'margin-top-small',
    'margin-top-children',
    'alignwide',
];

$wrapper_attributes = get_block_wrapper_attributes( [ 'class' => implode( ' ', $class_names ) ] );
?>
<div <?php echo $wrapper_attributes; // phpcs:ignore ?>>
    <div class="filters margin-top-children" data-meom-filters="filters">
        <?php if ( $filters_title ) : ?>
            <h2 class="h4"><?php echo esc_html( $filters_title ); ?></h2>
        <?php endif; ?>

        <?php
            $config = function_exists( '\MEOMFilters\filters_config' ) ? \MEOMFilters\filters_config() : '';
        ?>
        <form class="filters__form margin-top-children animated" data-meom-filters="form" data-meom-filters-post-type="house">
            <button class="filters__toggle js-filters-toggle" type="button" aria-expanded="false" data-meom-filters="filters-toggle">
                <svg aria-hidden="true" class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" /></svg>
                <?php esc_html_e( 'Suodata kohteita', 'meomblocks' ); ?>
                <span class="filters__count js-filters-count" aria-hidden="true"></span>
            </button>

            <div class="filters__wrapper has-hg-grey-black-background-color" data-meom-filters="filters-wrapper">
                <input type="hidden" name="language_code" value="<?php echo esc_attr( get_locale() ); ?>">
                <?php if ( function_exists( 'pll_current_language' ) ) : ?>
                    <input type="hidden" name="lang" value="<?php echo esc_attr( pll_current_language() ); ?>">
                <?php endif; ?>

                <button type="button" class="filters__close" data-meom-filters="close">
                    <span class="screen-reader-text"><?php esc_html_e( 'Sulje suodattimet', 'meomblocks' ); ?></span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2.24561 16L0 13.7544L5.77444 7.97995L0 2.24561L2.24561 0L8.02005 5.77444L13.7544 0L16 2.24561L10.2256 7.97995L16 13.7544L13.7544 16L8.02005 10.2256L2.24561 16Z" fill="currentColor"/></svg>
                </button>

                <div class="filters__wrapper-grid">
                    <?php
                    foreach ( $config['house']['tax_query'] as $tax_filter ) :
                        // Get terms.
                        $filter_terms = get_terms(
                            array(
                                'taxonomy' => $tax_filter['taxonomy'],
                            )
                        );

                        if ( ! empty( $filter_terms ) && ! is_wp_error( $filter_terms ) ) :
                            ?>
                            <button class="filters__fieldset-toggle" aria-expanded="false" data-meom-filters="fieldset-toggle" type="button">
                                <span class="filters__fieldset-toggle-text">
                                    <?php echo esc_html( get_taxonomy( $tax_filter['taxonomy'] )->label ); ?>
                                </span>
                                <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 8 5" fill="none"><path d="M4 5C3.90433 5 3.81465 4.9841 3.73094 4.95229C3.64723 4.92048 3.56951 4.86641 3.49776 4.79008L0.197309 1.27863C0.0657698 1.13868 0 0.96056 0 0.744275C0 0.52799 0.0657698 0.349873 0.197309 0.209924C0.328849 0.0699746 0.496263 0 0.699552 0C0.90284 0 1.07025 0.0699746 1.20179 0.209924L4 3.18702L6.79821 0.209924C6.92975 0.0699746 7.09716 0 7.30045 0C7.50374 0 7.67115 0.0699746 7.80269 0.209924C7.93423 0.349873 8 0.52799 8 0.744275C8 0.96056 7.93423 1.13868 7.80269 1.27863L4.50224 4.79008C4.43049 4.86641 4.35277 4.92048 4.26906 4.95229C4.18535 4.9841 4.09567 5 4 5Z" fill="currentColor"></path></svg>
                            </button>
                            <fieldset class="filters__fieldset">
                                <legend>
                                    <p class="filters__fieldset-legend screen-reader-text"><?php echo esc_html( get_taxonomy( $tax_filter['taxonomy'] )->label ); ?></p>
                                </legend>
                                <?php
                                foreach ( $filter_terms as $filter_term ) : ?>
                                    <div class="filters__input-wrapper">
                                        <input
                                            class="filters__tax-input filters__tax-<?php echo esc_attr( $tax_filter['taxonomy'] ); ?>"
                                            type="checkbox"
                                            id="filter-tax-<?php echo esc_attr( $tax_filter['taxonomy'] ); ?>-<?php echo esc_attr( $filter_term->slug ); ?>"
                                            value="<?php echo esc_attr( $filter_term->slug ); ?>"
                                            data-meom-filters="<?php echo esc_attr( $tax_filter['taxonomy'] ); ?>"
                                            data-meom-filters-label="<?php echo esc_attr( $filter_term->name ); ?>"
                                            name="<?php echo esc_attr( $tax_filter['name'] ); ?>"
                                            >
                                        <label class="filters__tax-label" for="filter-tax-<?php echo esc_attr( $tax_filter['taxonomy'] ); ?>-<?php echo esc_attr( $filter_term->slug ); ?>">
                                            <?php echo esc_attr( $filter_term->name ); ?>
                                        </label>
                                    </div>
                                    <?php
                                endforeach; ?>
                            </fieldset>
                            <?php
                        endif;
                    endforeach;
                    ?>
                </div>

                <div class="filters__reset-submit">
                    <button type="button" class="filters__reset" data-meom-filters="reset">
                        <?php esc_attr_e( 'Poista valinnat', 'meomblocks' ); ?>
                    </button>

                    <button type="button" class="btn filters__submit" data-meom-filters="submit">
                        <?php esc_attr_e( 'Näytä kohteet', 'meomblocks' ); ?><span class="filters__submit-count" data-meom-filters="submit-count"> (4)</span>
                    </button>
                </div>
            </div>
            <div class="filters__overlay js-filters-overlay" aria-hidden="true" data-meom-filters="overlay"></div>
        </form>

        <div class="filters__selected" data-meom-filters="selected"></div>
    </div>

    <div class="filters-items margin-top-children" data-meom-filters="items">
        <div class="filters__spinner" data-meom-filters="spinner" hidden>
            <svg aria-hidden="true" focusable="false" class="filters__spinner-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <rect class="filters__spinner-rect" y="0" width="100" height="100" fill="none"></rect>
                <circle class="filters__spinner-circle" cx="50" cy="50" r="40" stroke="#999999" fill="none" stroke-width="6" stroke-linecap="round"></circle>
            </svg>
        </div>

        <div class="filters-items__content grid-auto" data-meom-filters="items-content">
            <?php
           // Arguments.
            $args = [
                'posts_per_page'         => 6,
                'post_type'              => 'house',
                'no_found_rows'          => true,
                'update_post_meta_cache' => false,
                'update_post_term_cache' => false,
            ];

            // This is just for placeholder data so that first view is not empty.
            $latest_houses = new \WP_Query( $args );

            if ( $latest_houses->have_posts() ) {
                while ( $latest_houses->have_posts() ) {
                    $latest_houses->the_post();

                    get_template_part(
                        'partials/post/house-item',
                        '',
                        [
                            'item_id' => get_the_ID(),
                        ]
                    );
                }
            }
            wp_reset_postdata();
            ?>

        </div>

        <div class="filters__items_load-more-wrapper">
            <button class="filters-items__load-more btn" type="button" data-meom-filters="load-more">
                <?php esc_html_e( 'Lataa kohteita lisää', 'meomblocks' ); ?>
            </button>
        </div>
    </div>
    </div>
