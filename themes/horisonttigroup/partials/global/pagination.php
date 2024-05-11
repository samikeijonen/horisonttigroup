<div class="pagination-wrapper alignwide">
    <?php
        the_posts_pagination(
            [
                'before_page_number' => '<span class="screen-reader-text">' . esc_html__( 'Sivu', 'kala' ) . '</span>',
            ]
        );
    ?>
</div>
