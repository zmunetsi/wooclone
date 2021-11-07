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

function wooclone_page_templates($content)
{

    if (is_page('products')) {
        $content = dirname(__FILE__) . '/templates/products-template.php';
    } elseif (is_page('cart')) {
        $content = dirname(__FILE__) . '/templates/cart-template.php';
    } elseif (is_page('checkout')) {

        $content = dirname(__FILE__) . '/templates/checkout-template.php';
    } elseif (is_page('account')) {
        $content = dirname(__FILE__) . '/templates/account-template.php';
    }

    return $content;
}

function wooclone_scripts()
{
    wp_enqueue_script('wooclone-config-script', plugins_url('config.js', __FILE__), array(), WOOCLONE_VERSION, true);
    wp_enqueue_style('wooclone-build-css', plugins_url('/dist/main.css', __FILE__), array(), WOOCLONE_VERSION);
    wp_enqueue_script('wooclone-build-script', plugins_url('/dist/main.js', __FILE__), array(), WOOCLONE_VERSION, true);

    $api_endpoint = get_option('wooclone_api_endpoint');
    $current_user = wp_get_current_user();
    $user_firstname = $current_user->user_login;

    wp_localize_script('wooclone-config-script', 'scriptParams', $script_params = array(
        'api_endpoint' => $api_endpoint,
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('wooclone_nonce'),
        'site_url' => site_url(),
        'plugin_url' => plugins_url('', __FILE__),
        'version' => WOOCLONE_VERSION,
        'is_admin' => is_admin(),
        'is_user_logged_in' => is_user_logged_in(),
        'logged_in_username' => $user_firstname,

    ));

}

function wooclone_ajax_user_login()
{

    $info = array();
    $info['user_login'] = $_POST['username'];
    $info['user_password'] = $_POST['password'];
    $info['remember'] = true;

    $user_signon = wp_signon($info, false);
    if (is_wp_error($user_signon)) {
        echo json_encode(array('loggedin' => false, 'message' => __('Wrong username or password.')));
    } else {
        echo json_encode(array('loggedin' => true, 'message' => __('Login successful, redirecting...')));
    }

    die();

}

function wooclone_ajax_user_logout()
{
    $user_logout = wp_logout();
    if (is_wp_error($user_logout)) {
        echo json_encode(array('loggedout' => false, 'message' => __('Logout failed.')));
    } else {
        echo json_encode(array('loggedout' => true, 'message' => __('Logout successful, redirecting...')));
    }

    die();
}

function wooclone_ajax_user_register()
{
    $info = array();
    $info['first_name'] = sanitize_text_field($_POST['firstname']);
    $info['user_login'] = sanitize_text_field($_POST['username']);
    $info['user_pass'] = sanitize_text_field($_POST['password']);
    $info['user_email'] = sanitize_email($_POST['email']);

    // Register the user
    $user_register = wp_insert_user($info, false);
    if (is_wp_error($user_register)) {
        echo json_encode(array('registered' => false, 'message' => __('Registration Failed.')));
    } else {
        echo json_encode(array('registered' => true, 'message' => __('Registration successful, redirecting...')));
    }

    die();
}
