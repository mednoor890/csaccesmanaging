<?php

namespace App\DataFixtures;
use Faker\Factory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Domaine;
class DomaineFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create();

        for ($i = 0; $i < 15; $i++) {
            $domaine = new Domaine();
            $domaine->setHebergeur($faker->company);
            $domaine->setDateAct($faker->date);
            $domaine->setDateFin($faker->date);
            $domaine->setDomainName($faker->domainName);
            $domaine->setClientProp($faker->name);

            $manager->persist($domaine);
        }

        $manager->flush();
    }
}
