<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Admin',
            'email' => 'giancarlos@gmail.com',
            'password' => Hash::make('giancarlos123'), // Asegúrate de usar un hash seguro para la contraseña
        ]);
    }
}
