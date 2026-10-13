<?php
/**
 * ============================================================
 * AMULYA BUILDERS — HOSTINGER MYSQL DATABASE CONFIGURATION
 * ============================================================
 * Enter your Hostinger MySQL database credentials below
 * (Found in Hostinger hPanel -> Databases -> Management)
 */

define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_NAME', getenv('DB_NAME') ?: 'u123456789_amulya');     // <-- Replace with your Hostinger MySQL Database Name
define('DB_USER', getenv('DB_USER') ?: 'u123456789_admin');      // <-- Replace with your Hostinger MySQL Username
define('DB_PASS', getenv('DB_PASS') ?: 'YourDatabasePassword');  // <-- Replace with your Hostinger MySQL Password

// Secret key for Admin JWT Authentication
define('JWT_SECRET', getenv('JWT_SECRET') ?: 'amulya-builders-super-secret-key-98765');
