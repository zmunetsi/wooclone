<?php

class Wooclone
{

    private static $initiated = false;
    private static $end_point = '';
    public static $products = array();

    public static function init()
    {
        if (!self::$initiated) {
            self::init_hooks();
        }
    }

    private function init_hooks()
    {
        self::$initiated = true;
        self::$end_point = get_option('wooclone_api_endpoint');
        add_action( 'wp_enqueue_scripts', 'wooclone_scripts' );

        if (!is_user_logged_in()) {
            add_action('wp_ajax_user_login', 'wooclone_ajax_user_login');
            add_action('wp_ajax_nopriv_user_login', 'wooclone_ajax_user_login');

            add_action( 'wp_ajax_user_register', 'wooclone_ajax_user_register' );
            add_action( 'wp_ajax_nopriv_user_register', 'wooclone_ajax_user_register' );
        }
        
        if( is_user_logged_in() ){
            add_action( 'wp_ajax_user_logout', 'wooclone_ajax_user_logout' ); 
            add_action( 'wp_ajax_nopriv_user_logout', 'wooclone_ajax_user_logout' ); 
        }
         
       
        add_filter('page_template', 'wooclone_page_templates');

    }


}
