<?php
/**
 * Partial for displaying the person item.
 *
 * @package Kala
 */

$item_id = ! empty( $args['item_id'] ) ? $args['item_id'] : get_the_ID();

$person_email         = get_field( 'person_email', $item_id );
$person_phone         = get_field( 'person_phone', $item_id );
$person_whatsapp      = get_field( 'person_whatsapp', $item_id );
$person_calendly_link = get_field( 'person_calendly_link', $item_id );
$person_calendly_text = get_field( 'person_calendly_text', $item_id );
$person_linkedin_link = get_field( 'person_linkedin_link', $item_id );
$person_linkedin_text = get_field( 'person_linkedin_text', $item_id );

?>
<article id="person-<?php echo esc_attr( $item_id ); ?>" <?php post_class( 'person-item' ); ?>>
    <div class="person-item__container">
        <?php if ( has_post_thumbnail( $item_id ) ) : ?>
            <figure class="person-item__image">
                <?php echo get_the_post_thumbnail( $item_id, 'medium_large' ); ?>
            </figure>
        <?php endif; ?>

        <div class="person-item__content margin-top-children margin-top-children--xs">
            <h3 class="person-item__title h4">
                <?php echo esc_html( get_the_title( $item_id ) ); ?>
            </h3>

            <ul class="person-item__info">
                <?php if ( $person_email ) : ?>
                    <li class="person-item__social">
                        <a class="person-item__social-link" href="mailto:<?php echo esc_attr( $person_email ); ?>">
                            <?php
                                Kala\display_svg( 'mail' );
                                echo esc_html( $person_email );
                            ?>
                        </a>
                    </li>
                <?php endif; ?>

                <?php if ( $person_phone ) : ?>
                    <li class="person-person-item__social">
                        <a class="person-item__social-link" href="tel:<?php echo esc_attr( $person_phone ); ?>">
                            <?php
                                Kala\display_svg( 'phone' );
                                echo esc_html( $person_phone );
                            ?>
                        </a>
                    </li>
                <?php endif; ?>

                <?php if ( $person_phone && $person_whatsapp ) : ?>
                    <li class="person-item__social">
                        <a class="person-item__social-link" href="https://api.whatsapp.com/send?phone=<?php echo esc_attr( str_replace( ' ', '', $person_phone ) ); ?>">
                            <?php
                                Kala\display_svg( 'whatsapp' );
                                echo esc_html( $person_whatsapp );
                            ?>
                        </a>
                    </li>
                <?php endif; ?>

                <?php if ( $person_calendly_link && $person_calendly_text ) : ?>
                    <li class="person-item__social">
                        <a class="person-item__social-link" href="<?php echo esc_url( $person_calendly_link ); ?>">
                            <?php
                                Kala\display_svg( 'calendar' );
                                echo esc_html( $person_calendly_text );
                            ?>
                        </a>
                    </li>
                <?php endif; ?>

                <?php if ( $person_linkedin_link && $person_linkedin_text ) : ?>
                    <li class="person-item__social">
                        <a class="person-item__social-link" href="<?php echo esc_url( $person_linkedin_link ); ?>">
                            <?php
                                Kala\display_svg( 'linkedin' );
                                echo esc_html( $person_linkedin_text );
                            ?>
                        </a>
                    </li>
                <?php endif; ?>
            </ul>
        </div>
    </div>
</article>
