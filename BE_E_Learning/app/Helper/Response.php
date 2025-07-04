<?php

namespace App\Helper;

/**
 * Response Class helper
 */
class Response
{
    /**
     * @param array|string|object $data
     * @param int                 $total
     * @param string              $message
     * @param int                 $status
     *
     * @return array
     */
    public static function data(array|string|object $data = [], int $total = 0, string $message = 'Successfully', int $status = 200): array
    {
        return [
            'status' => $status,
            'message' => $message,
            'data' => $data,
            'total' => $total
        ];
    }

    /**
     * @param string $message
     * @param int    $status
     *
     * @return array
     */
    public static function dataError(string $message = 'Forbidden', int $status = 449): array
    {
        return self::data([], 0, $message, $status);
    }
}
