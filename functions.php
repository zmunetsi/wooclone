<?php

function wooclone_plugin_activation()
{

    if (!current_user_can('activate_plugins')) {
        return;
    }

    global $wpdb;

    if (null === $wpdb->get_row("SELECT post_name FROM {$wpdb->prefix}posts WHERE post_name = 'products_slug'", 'ARRAY_A')) {

        $current_user = wp_get_current_user();

        // create post object

        $page = array(

            'post_title' => __('Products'),

            'post_status' => 'publish',

            'post_author' => $current_user->ID,

            'post_type' => 'page',

        );

        // insert the post into the database

        wp_insert_post($page);

    }

}

function wooclone_plugin_deactivation()
{
    if (!current_user_can('activate_plugins')) {
        return;
    }

    global $wpdb;
}

function products_page_template( $content )
{
   
    if ( is_page( 'products' ) ) {
        $content = dirname( __FILE__ ) . '/templates/products-template.php';
    }
    return $content;
}
