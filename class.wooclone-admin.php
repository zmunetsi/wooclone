<?php

class Wooclone_Admin
{

    const API_HOST = '';
    private static $initiated = false;

    public static function init()
    {
        if (!self::$initiated) {
            self::init_hooks();
        }
    }

    private function init_hooks()
    {
        self::$initiated = true;
        add_action( 'admin_enqueue_scripts', array( __CLASS__, 'wooclone_adminAssets' ) );
        add_action( 'admin_menu', array( __CLASS__, 'wooclone_adminMenu' ) );
    }

    public static function wooclone_adminMenu() {
        add_menu_page(
            __( 'Woo Clone', 'wooclone-settings' ),
            __( 'Woo Clone', 'wooclone-settings' ),
            'manage_options',
            'wooclone_settings',
            array( __CLASS__, 'wooclone_menuPage' ),
            'dashicons-tagcloud',
            6
        );
    }

    public static function wooclone_menuPage() {
        if ( is_file( plugin_dir_path( __FILE__ ) . 'includes/layout.php' ) ) {
            include_once plugin_dir_path( __FILE__ ) . 'includes/layout.php';
        }
    }
 
    public static function wooclone_getSettings() {
        return get_option( 'wooclone_settings' );
    }
 
    public static function wooclone_adminAssets() {
        if ( isset( $_GET['page'] ) && ! empty( $_GET['page'] ) && 'wooclone-settings' === $_GET['page'] ) {
 
        }
    }



}
