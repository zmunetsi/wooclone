<?php

class Wooclone
{

    private static $initiated = false;

    public static function init() {
		if ( ! self::$initiated ) {
			self::init_hooks();
		}
	}

    private function init_hooks (){
        self::$initiated = true;
       
    }

}