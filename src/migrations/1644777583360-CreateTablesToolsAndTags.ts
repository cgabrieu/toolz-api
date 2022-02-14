import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTablesToolsAndTags1644777583360 implements MigrationInterface {
    name = 'CreateTablesToolsAndTags1644777583360'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tools" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "link" character varying NOT NULL, "description" character varying NOT NULL, "userId" integer, CONSTRAINT "UQ_4e9d7057994d43fc8f03947858e" UNIQUE ("title"), CONSTRAINT "UQ_ff4a161665679a80d288bc35f74" UNIQUE ("link"), CONSTRAINT "PK_e23d56734caad471277bad8bf85" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tools_tags_tags" ("toolsId" integer NOT NULL, "tagsId" integer NOT NULL, CONSTRAINT "PK_5b199cd899eddb19d4c4832a7de" PRIMARY KEY ("toolsId", "tagsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4a357f1433ef8a3d2c05c6f744" ON "tools_tags_tags" ("toolsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8a5cb8e421b3c0c5e5ce7b6ebe" ON "tools_tags_tags" ("tagsId") `);
        await queryRunner.query(`ALTER TABLE "tools" ADD CONSTRAINT "FK_d16f67296fd9b08df781295cb46" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tools_tags_tags" ADD CONSTRAINT "FK_4a357f1433ef8a3d2c05c6f7445" FOREIGN KEY ("toolsId") REFERENCES "tools"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tools_tags_tags" ADD CONSTRAINT "FK_8a5cb8e421b3c0c5e5ce7b6ebea" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tools_tags_tags" DROP CONSTRAINT "FK_8a5cb8e421b3c0c5e5ce7b6ebea"`);
        await queryRunner.query(`ALTER TABLE "tools_tags_tags" DROP CONSTRAINT "FK_4a357f1433ef8a3d2c05c6f7445"`);
        await queryRunner.query(`ALTER TABLE "tools" DROP CONSTRAINT "FK_d16f67296fd9b08df781295cb46"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8a5cb8e421b3c0c5e5ce7b6ebe"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4a357f1433ef8a3d2c05c6f744"`);
        await queryRunner.query(`DROP TABLE "tools_tags_tags"`);
        await queryRunner.query(`DROP TABLE "tools"`);
        await queryRunner.query(`DROP TABLE "tags"`);
    }

}
