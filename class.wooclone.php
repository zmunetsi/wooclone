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
        add_action('page_template', array(__CLASS__, 'wooclone_setProducts'));
        add_filter('page_template', 'products_page_template');

    }

    public static function wooclone_setProducts()
    {
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => self::$end_point,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'GET',
        ));

        $response = curl_exec($curl);

        curl_close($curl);
        self::$products =  json_decode( $response, true );
    }

    public static function wooclone_getProducts()
    {

        return self::$products;
    }


}
