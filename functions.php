<?php

function wooclone_plugin_activation()
{

    if (!current_user_can('activate_plugins')) {
        return;
    }

    global $wpdb;

    if (null === $wpdb->get_row("SELECT post_name FROM {$wpdb->prefix}posts WHERE post_name = 'products'", 'ARRAY_A')) {

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

    if (null === $wpdb->get_row("SELECT post_name FROM {$wpdb->prefix}posts WHERE post_name = 'cart'", 'ARRAY_A')) {

        $current_user = wp_get_current_user();

        // create post object

        $page = array(

            'post_title' => __('Cart'),

            'post_status' => 'publish',

            'post_author' => $current_user->ID,

            'post_type' => 'page',

        );

        // insert the post into the database

        wp_insert_post($page);

    }

    if (null === $wpdb->get_row("SELECT post_name FROM {$wpdb->prefix}posts WHERE post_name = 'checkout'", 'ARRAY_A')) {

        $current_user = wp_get_current_user();

        // create post object

        $page = array(

            'post_title' => __('Checkout'),

            'post_status' => 'publish',

            'post_author' => $current_user->ID,

            'post_type' => 'page',

        );

        // insert the post into the database

        wp_insert_post($page);

    }

    if (null === $wpdb->get_row("SELECT post_name FROM {$wpdb->prefix}posts WHERE post_name = 'account'", 'ARRAY_A')) {

        $current_user = wp_get_current_user();

        // create post object

        $page = array(

            'post_title' => __('Account'),

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

function wooclone_page_templates( $content )
{
   
    if ( is_page( 'products' ) ) {
        $content = dirname( __FILE__ ) . '/templates/products-template.php';
    }elseif( is_page( 'cart' ) ){
        $content = dirname( __FILE__ ) . '/templates/cart-template.php';
    }elseif ( is_page( 'checkout' ) ){

        $content = dirname( __FILE__ ) . '/templates/checkout-template.php';
    }elseif ( is_page( 'account' ) ){
        $content = dirname( __FILE__ ) . '/templates/account-template.php';
    }

    return $content;
}

function wooclone_scripts() {
	wp_enqueue_style( 'wooclone-build-css',plugins_url( '/dist/main.css', __FILE__ ), array(), WOOCLONE_VERSION);
	wp_enqueue_script( 'wooclone-build-script', plugins_url( '/dist/main.js', __FILE__ ), array(), WOOCLONE_VERSION, true );
	wp_enqueue_script( 'wooclone-config-script', plugins_url( 'config.js', __FILE__ ), array(), WOOCLONE_VERSION, true );


    $script_params = array(
        'api_endpoint' =>  get_option('wooclone_api_endpoint')
    );

    wp_localize_script( 'wooclone-config-script', 'scriptParams', $script_params );
}

