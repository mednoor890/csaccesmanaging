<?php

namespace App\Entity;

use App\Repository\DataBaseRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: DataBaseRepository::class)]
class DataBase
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    private $HostUrl;

    #[ORM\Column(type: 'string', length: 255)]
    private $DbName;

    #[ORM\Column(type: 'string', length: 255)]
    private $login;

    #[ORM\Column(type: 'string', length: 255)]
    private $password;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getHostUrl(): ?string
    {
        return $this->HostUrl;
    }

    public function setHostUrl(string $HostUrl): self
    {
        $this->HostUrl = $HostUrl;

        return $this;
    }

    public function getDbName(): ?string
    {
        return $this->DbName;
    }

    public function setDbName(string $DbName): self
    {
        $this->DbName = $DbName;

        return $this;
    }

    public function getLogin(): ?string
    {
        return $this->login;
    }

    public function setLogin(string $login): self
    {
        $this->login = $login;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }
}
