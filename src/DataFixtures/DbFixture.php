<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\DataBase;
use Faker\Factory;
class DbFixture extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create();

        for ($i = 0; $i < 20; $i++) {
            $Db = new DataBase();
            $Db->setHostUrl($faker->url);
            $Db->setDbName($faker->word);
            $Db->setLogin($faker->word);
            $Db->setPassword($faker->password);
            

            $manager->persist($Db);
        }

        $manager->flush();
    }
}
