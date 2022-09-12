<?php

namespace App\Entity;

use App\Repository\DomaineRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: DomaineRepository::class)]
class Domaine
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    private $hebergeur;

    #[ORM\Column(type: 'string', length: 255)]
    private $dateAct;

    #[ORM\Column(type: 'string', length: 255)]
    private $dateFin;

    #[ORM\Column(type: 'string', length: 255)]
    private $DomainName;

    #[ORM\Column(type: 'string', length: 255)]
    private $clientProp;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getHebergeur(): ?string
    {
        return $this->hebergeur;
    }

    public function setHebergeur(string $hebergeur): self
    {
        $this->hebergeur = $hebergeur;

        return $this;
    }

    public function getDateAct(): ?string
    {
        return $this->dateAct;
    }

    public function setDateAct(string $dateAct): self
    {
        $this->dateAct = $dateAct;

        return $this;
    }

    public function getDateFin(): ?string
    {
        return $this->dateFin;
    }

    public function setDateFin(string $dateFin): self
    {
        $this->dateFin = $dateFin;

        return $this;
    }

    public function getDomainName(): ?string
    {
        return $this->DomainName;
    }

    public function setDomainName(string $DomainName): self
    {
        $this->DomainName = $DomainName;

        return $this;
    }

    public function getClientProp(): ?string
    {
        return $this->clientProp;
    }

    public function setClientProp(string $clientProp): self
    {
        $this->clientProp = $clientProp;

        return $this;
    }
}
