import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifLeague1742580467622 implements MigrationInterface {
    name = 'ModifLeague1742580467622'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "arbitre" ADD "leagueId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "arbitre" ADD CONSTRAINT "FK_efbdc82e0919e29e6ef4df68b82" FOREIGN KEY ("leagueId") REFERENCES "league"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "arbitre" DROP CONSTRAINT "FK_efbdc82e0919e29e6ef4df68b82"`);
        await queryRunner.query(`ALTER TABLE "arbitre" DROP COLUMN "leagueId"`);
    }

}
