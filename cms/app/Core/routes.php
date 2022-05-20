<?php

#use route controller
use App\Core\Route;

#page route setting
Route::GET("/", 'MainController', 'index');
// Route::{method}(url, controller, action);

#page view
Route::run();