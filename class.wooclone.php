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
        add_filter('page_template', 'wooclone_page_templates');

    }


}
