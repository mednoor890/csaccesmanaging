<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use App\Entity\Site;
class SiteFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create();

        for ($i = 0; $i < 20; $i++) {
            $site = new Site();
            $site->setHostUrl($faker->url);
            $site->setLogin($faker->userName);
            $site->setPassword($faker->password);

            $manager->persist($site);
        }

        $manager->flush();
    }
}
