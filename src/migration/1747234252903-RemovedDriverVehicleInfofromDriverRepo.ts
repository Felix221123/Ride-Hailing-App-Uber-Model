import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovedDriverVehicleInfofromDriverRepo1747234252903 implements MigrationInterface {
    name = 'RemovedDriverVehicleInfofromDriverRepo1747234252903'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "vehicleNumber"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "sessionToken" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "sessionToken" SET DEFAULT uuid_generate_v4()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "sessionToken" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "sessionToken" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "vehicleNumber" json`);
    }

}
