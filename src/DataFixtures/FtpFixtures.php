<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Ftp;
use Faker\Factory;

class FtpFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create();

        for ($i = 0; $i < 8; $i++) {
            $ftp = new Ftp();
            $ftp->setHostUrl($faker->url);
            $ftp->setLogin($faker->userName);
            $ftp->setPassword($faker->password);

            $manager->persist($ftp);
        }

        $manager->flush();
    }
}
