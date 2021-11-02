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
        add_action('admin_enqueue_scripts', array(__CLASS__, 'wooclone_adminAssets'));
        add_action('admin_menu', array(__CLASS__, 'wooclone_adminMenu'));
        add_action('admin_init', array(__CLASS__, 'wooclone_registerSettings'));
        add_action('rest_api_init', array(__CLASS__, 'wooclone_registerSettings'));
    }

    public static function wooclone_adminMenu()
    {
        add_menu_page(
            __('Woo Clone', 'wooclone-settings'),
            __('Woo Clone', 'wooclone-settings'),
            'manage_options',
            'wooclone_settings',
            array(__CLASS__, 'wooclone_menuPage'),
            'dashicons-tagcloud',
            6
        );
    }

    public static function wooclone_menuPage()
    {
        if (is_file(plugin_dir_path(__FILE__) . 'includes/layout.php')) {
            include_once plugin_dir_path(__FILE__) . 'includes/layout.php';
        }
    }


    public static function wooclone_registerSettings()
    {
        add_settings_section(
            'wooclone_endpoint_section',
            'Field to add API endpoint',
            array(__CLASS__, 'wooclone_endpointSection_content'),
            'wooclone_settings'
        );

        unset($args);
        $args = array(
            'type' => 'input',
            'subtype' => 'text',
            'id' => 'wooclone_api_endpoint',
            'name' => 'wooclone_api_endpoint',
            'required' => 'true',
            'get_options_list' => '',
            'value_type' => 'normal',
            'wp_data' => 'option',
        );
        add_settings_field(
            'wooclone_api_endpoint',
            'API Endpoint',
            array(__CLASS__, 'wooclone_render_settings_field'),
            'wooclone_settings',
            'wooclone_endpoint_section',
            $args
        );

        register_setting(
            'wooclone_settings',
            'wooclone_api_endpoint'
            );

    }
    
    public static function wooclone_render_settings_field (){
        echo '<input type= "text" name = "wooclone_api_endpoint" />';
    }
    public static function wooclone_endpointSection_content ( $args){
        
        echo '<p>These settings apply to all Plugin Name functionality.</p>';
    }

    public static function wooclone_adminAssets()
    {
        if (isset($_GET['page']) && !empty($_GET['page']) && 'wooclone-settings' === $_GET['page']) {

        }
    }

}
