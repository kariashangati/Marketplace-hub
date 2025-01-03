<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Store;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'productName' => fake()->name(),
            'description' => fake()->text(),
            'category_id' => Category::inRandomOrder()->value('id'),
            'store_id' => Store::inRandomOrder()->value('id'),
            'price' => fake()->randomFloat(2,100,1000),
            'likes' => fake()->randomFloat(0,10,200),
            'status' => fake()->randomElement(['pending','accepted']),
            'location' => fake()->city(),
            'delivry' => fake()->boolean(),
        ];
    }
}
