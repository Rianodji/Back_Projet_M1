import { MigrationInterface, QueryRunner } from "typeorm";

export class MisAJourArbitreNone1742578048302 implements MigrationInterface {
    name = 'MisAJourArbitreNone1742578048302'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "equipe" ADD "leagueId" integer`);
        await queryRunner.query(`ALTER TABLE "equipe" ADD CONSTRAINT "FK_576dbce2e7e9e4b2f231d434209" FOREIGN KEY ("leagueId") REFERENCES "league"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "equipe" DROP CONSTRAINT "FK_576dbce2e7e9e4b2f231d434209"`);
        await queryRunner.query(`ALTER TABLE "equipe" DROP COLUMN "leagueId"`);
    }

}
