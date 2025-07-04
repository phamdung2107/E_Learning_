<?php

namespace App\Helper;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

/**
 * Response Class helper
 */
class Helpers
{
    public static function  isJson($str){
        if ($str){
            if (is_numeric($str))
                return false;
            if (is_string($str)){
                return !is_null(json_decode($str));
            }
        }
        return false;
    }
    public static function jsonDecode($str){
        $results = json_decode($str, true);
        if ($results){
            foreach ($results as &$result){
                if (self::isJson($result)){
                    $result = self::jsonDecode($result);
                }
            }
        }
        return $results;
    }

}
