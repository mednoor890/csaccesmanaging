<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220717143859 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE domaine DROP FOREIGN KEY FK_78AF0ACC8C8EBBC0');
        $this->addSql('DROP INDEX IDX_78AF0ACC8C8EBBC0 ON domaine');
        $this->addSql('ALTER TABLE domaine ADD client_prop VARCHAR(255) NOT NULL, DROP client_prop_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE domaine ADD client_prop_id INT NOT NULL, DROP client_prop');
        $this->addSql('ALTER TABLE domaine ADD CONSTRAINT FK_78AF0ACC8C8EBBC0 FOREIGN KEY (client_prop_id) REFERENCES client (id)');
        $this->addSql('CREATE INDEX IDX_78AF0ACC8C8EBBC0 ON domaine (client_prop_id)');
    }
}
