import { MigrationInterface, QueryRunner } from "typeorm";

export class AllModele1741636169533 implements MigrationInterface {
    name = 'AllModele1741636169533'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "journee" ("id" SERIAL NOT NULL, "numero" integer NOT NULL, "debut" date NOT NULL, "fin" date NOT NULL, "saisonId" integer, CONSTRAINT "PK_39dea7b812575140b1eed22035e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "arbitrage" ("id" SERIAL NOT NULL, "date" date NOT NULL, "arbitreId" integer, "saisonId" integer, CONSTRAINT "UQ_bdc47e0091ea4190f4c557f8487" UNIQUE ("arbitreId", "saisonId"), CONSTRAINT "PK_9f655fff259fd01401c6a51c430" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "arbitre" ("id" SERIAL NOT NULL, "nom" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_6eda407a72f37f838c288408a76" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "match_arbitre" ("id" SERIAL NOT NULL, "matchId" integer, "arbitreId" integer, CONSTRAINT "PK_8b546e193fb69b597f5d6fad8a2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "indisponibilite" ("id" SERIAL NOT NULL, "debut" date NOT NULL, "fin" date NOT NULL, "raison" character varying NOT NULL, "joueurId" integer, CONSTRAINT "PK_3f246067f7e96b8cd56a69cdc58" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "joueur" ("id" SERIAL NOT NULL, "nom" character varying NOT NULL, "prenom" character varying NOT NULL, "date_naissance" character varying NOT NULL, "post" character varying NOT NULL, CONSTRAINT "PK_f5c58c07f3cb493b89dd40a2891" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."selection_selection_type_enum" AS ENUM('Titulaire', 'Remplaçant')`);
        await queryRunner.query(`CREATE TYPE "public"."selection_post_enum" AS ENUM('Attaquant', 'Milieu', 'Défenseur', 'Gardien')`);
        await queryRunner.query(`CREATE TABLE "selection" ("id" SERIAL NOT NULL, "selection_type" "public"."selection_selection_type_enum" NOT NULL, "nb_but" integer NOT NULL DEFAULT '0', "nb_passe" integer NOT NULL DEFAULT '0', "nb_carton_jaune" integer NOT NULL DEFAULT '0', "nb_carton_rouge" integer NOT NULL DEFAULT '0', "post" "public"."selection_post_enum" NOT NULL, "matchId" integer, "joueurId" integer, "equipeId" integer, CONSTRAINT "PK_20fb10953022abffab5721a9e3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."match_status_enum" AS ENUM('en_cours', 'termine', 'annule')`);
        await queryRunner.query(`CREATE TABLE "match" ("id" SERIAL NOT NULL, "score_equipe1" integer NOT NULL, "score_equipe2" integer NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."match_status_enum" NOT NULL, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "journeeId" integer, CONSTRAINT "PK_92b6c3a6631dd5b24a67c69f69d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "matchs_equipes" ("id" SERIAL NOT NULL, "matchId" integer, "equipeId" integer, CONSTRAINT "PK_458f2753961a04ca6d05a6d55bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "equipe" ("id" SERIAL NOT NULL, "nom" character varying(255) NOT NULL, "ville" character varying(255) NOT NULL, "dateCreation" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_f2503347d661dac29b5a0035f22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "inscription" ("id" SERIAL NOT NULL, "debut" date NOT NULL, "fin" date NOT NULL, "saisonId" integer, "equipeId" integer, "joueurId" integer, CONSTRAINT "PK_e3ec336b4b1fd26e2370893d24b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "saison" ("id" SERIAL NOT NULL, "debut" date NOT NULL, "fin" date NOT NULL, "nb_equipe" integer NOT NULL, "nb_arbitre" integer NOT NULL, "nb_remplacement" integer NOT NULL, "leagueId" integer, CONSTRAINT "PK_1772ab2d3d9b9e7e78474b2b7de" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "league" ("id" SERIAL NOT NULL, "display_name" character varying NOT NULL, "country" character varying NOT NULL, "date_creation" date NOT NULL, "userId" integer, CONSTRAINT "PK_0bd74b698f9e28875df738f7864" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "journee" ADD CONSTRAINT "FK_8b2c32407ce32d8f57bb189c1cd" FOREIGN KEY ("saisonId") REFERENCES "saison"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "arbitrage" ADD CONSTRAINT "FK_e15bb7ee4e23cf7aa1e0cfda38d" FOREIGN KEY ("arbitreId") REFERENCES "arbitre"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "arbitrage" ADD CONSTRAINT "FK_4e3a74fa150c3276e71a5da6dd8" FOREIGN KEY ("saisonId") REFERENCES "saison"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match_arbitre" ADD CONSTRAINT "FK_ebbfa77ee5d34385fdc500e9ae5" FOREIGN KEY ("matchId") REFERENCES "match"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match_arbitre" ADD CONSTRAINT "FK_24fd31f407039c49932fcea7589" FOREIGN KEY ("arbitreId") REFERENCES "arbitre"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "indisponibilite" ADD CONSTRAINT "FK_16989852a7d54cc208e1c2a5b26" FOREIGN KEY ("joueurId") REFERENCES "joueur"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "selection" ADD CONSTRAINT "FK_e7a02d7d0c179357a0f2b0c69af" FOREIGN KEY ("matchId") REFERENCES "match"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "selection" ADD CONSTRAINT "FK_da641ec43452657b95e91223494" FOREIGN KEY ("joueurId") REFERENCES "joueur"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "selection" ADD CONSTRAINT "FK_0022c0df0aeeee8e2fc2f33a3df" FOREIGN KEY ("equipeId") REFERENCES "equipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_ddf2f4f27127fae6f5e2cb461b2" FOREIGN KEY ("journeeId") REFERENCES "journee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "matchs_equipes" ADD CONSTRAINT "FK_e943385d72bb1c21e37d9bf46a2" FOREIGN KEY ("matchId") REFERENCES "match"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "matchs_equipes" ADD CONSTRAINT "FK_94cd049e7a89e09ebb5d888c4ec" FOREIGN KEY ("equipeId") REFERENCES "equipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inscription" ADD CONSTRAINT "FK_86ab7620c11f249b93a5964890d" FOREIGN KEY ("saisonId") REFERENCES "saison"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inscription" ADD CONSTRAINT "FK_b2e2acab925b930cea02d00c1f1" FOREIGN KEY ("equipeId") REFERENCES "equipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inscription" ADD CONSTRAINT "FK_a2b3b4a731019b8bab9678a1266" FOREIGN KEY ("joueurId") REFERENCES "joueur"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "saison" ADD CONSTRAINT "FK_21a531538a6b8f4b588cd1fdef8" FOREIGN KEY ("leagueId") REFERENCES "league"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "league" ADD CONSTRAINT "FK_5bc7a5ed3c194eff622d155c4fd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "league" DROP CONSTRAINT "FK_5bc7a5ed3c194eff622d155c4fd"`);
        await queryRunner.query(`ALTER TABLE "saison" DROP CONSTRAINT "FK_21a531538a6b8f4b588cd1fdef8"`);
        await queryRunner.query(`ALTER TABLE "inscription" DROP CONSTRAINT "FK_a2b3b4a731019b8bab9678a1266"`);
        await queryRunner.query(`ALTER TABLE "inscription" DROP CONSTRAINT "FK_b2e2acab925b930cea02d00c1f1"`);
        await queryRunner.query(`ALTER TABLE "inscription" DROP CONSTRAINT "FK_86ab7620c11f249b93a5964890d"`);
        await queryRunner.query(`ALTER TABLE "matchs_equipes" DROP CONSTRAINT "FK_94cd049e7a89e09ebb5d888c4ec"`);
        await queryRunner.query(`ALTER TABLE "matchs_equipes" DROP CONSTRAINT "FK_e943385d72bb1c21e37d9bf46a2"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_ddf2f4f27127fae6f5e2cb461b2"`);
        await queryRunner.query(`ALTER TABLE "selection" DROP CONSTRAINT "FK_0022c0df0aeeee8e2fc2f33a3df"`);
        await queryRunner.query(`ALTER TABLE "selection" DROP CONSTRAINT "FK_da641ec43452657b95e91223494"`);
        await queryRunner.query(`ALTER TABLE "selection" DROP CONSTRAINT "FK_e7a02d7d0c179357a0f2b0c69af"`);
        await queryRunner.query(`ALTER TABLE "indisponibilite" DROP CONSTRAINT "FK_16989852a7d54cc208e1c2a5b26"`);
        await queryRunner.query(`ALTER TABLE "match_arbitre" DROP CONSTRAINT "FK_24fd31f407039c49932fcea7589"`);
        await queryRunner.query(`ALTER TABLE "match_arbitre" DROP CONSTRAINT "FK_ebbfa77ee5d34385fdc500e9ae5"`);
        await queryRunner.query(`ALTER TABLE "arbitrage" DROP CONSTRAINT "FK_4e3a74fa150c3276e71a5da6dd8"`);
        await queryRunner.query(`ALTER TABLE "arbitrage" DROP CONSTRAINT "FK_e15bb7ee4e23cf7aa1e0cfda38d"`);
        await queryRunner.query(`ALTER TABLE "journee" DROP CONSTRAINT "FK_8b2c32407ce32d8f57bb189c1cd"`);
        await queryRunner.query(`DROP TABLE "league"`);
        await queryRunner.query(`DROP TABLE "saison"`);
        await queryRunner.query(`DROP TABLE "inscription"`);
        await queryRunner.query(`DROP TABLE "equipe"`);
        await queryRunner.query(`DROP TABLE "matchs_equipes"`);
        await queryRunner.query(`DROP TABLE "match"`);
        await queryRunner.query(`DROP TYPE "public"."match_status_enum"`);
        await queryRunner.query(`DROP TABLE "selection"`);
        await queryRunner.query(`DROP TYPE "public"."selection_post_enum"`);
        await queryRunner.query(`DROP TYPE "public"."selection_selection_type_enum"`);
        await queryRunner.query(`DROP TABLE "joueur"`);
        await queryRunner.query(`DROP TABLE "indisponibilite"`);
        await queryRunner.query(`DROP TABLE "match_arbitre"`);
        await queryRunner.query(`DROP TABLE "arbitre"`);
        await queryRunner.query(`DROP TABLE "arbitrage"`);
        await queryRunner.query(`DROP TABLE "journee"`);
    }

}
