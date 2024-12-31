<?php

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

require __DIR__.'/auth.php';

Route::get('/testEmail', function () {
    $toEmail = 'soufianeboukir0@gmail.com'; // bddl b lemail dyaalk
    try {
        Mail::raw('Successfully sended!!.', function ($message) use ($toEmail) {
            $message->to($toEmail)
                    ->subject('Test Email');
        });
        return 'Test email sent successfully!';
    } catch (\Exception $e) {
        return 'Error: ' . $e->getMessage();
    }
});
