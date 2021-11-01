<?php
/**
 * @package Wooclone
 */
/*
Plugin Name: Woo Clone
Plugin URI: https://munetsizunguzira.com/
Description: Simple wordpress plugin that pulls products from a set endpoint, cart and checkout system.
Version: 1.0.0
Author: Munetsi Zunguzira
Author URI: https://munetsizunguzira.com/
License: GPLv2 or later
Text Domain: wooclone
*/

/*
This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

*/

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

define( 'WOOCLONE_VERSION', '1.0.0' );
define( 'WOOCLONE__PLUGIN_DIR', plugin_dir_path( __FILE__ ) );

register_activation_hook( __FILE__, array( 'Wooclone', 'plugin_activation' ) );
register_deactivation_hook( __FILE__, array( 'Wooclone', 'plugin_deactivation' ) );

require_once( WOOCLONE__PLUGIN_DIR . 'class.wooclone.php' );

add_action( 'init', array( 'Wooclone', 'init' ) );

if ( is_admin() || ( defined( 'WP_CLI' ) && WP_CLI ) ) {
	require_once( WOOCLONE__PLUGIN_DIR . 'class.wooclone-admin.php' );
	add_action( 'init', array( 'Wooclone_Admin', 'init' ) );
}

