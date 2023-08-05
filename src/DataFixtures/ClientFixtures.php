<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use App\Entity\Client;
class ClientFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        // $product = new Product();
        // $manager->persist($product);
        $faker = Factory::create();

        for ($i = 0; $i < 20; $i++) {
            $client = new Client();
            $client->setName($faker->firstName);
            $client->setLname($faker->lastName);
            $client->setCompanyName($faker->company);
            $client->setEmail($faker->email);
            $client->setEtat($faker->randomElement(['active', 'inactive', 'pending']));
            $client->setDomainName($faker->url);

            $manager->persist($client);
        }

        $manager->flush();
    }
}
