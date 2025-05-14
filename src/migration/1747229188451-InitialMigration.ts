import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1747229188451 implements MigrationInterface {
    name = 'InitialMigration1747229188451'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "emailAddress" character varying, "password" character varying NOT NULL, "role" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, "status" character varying NOT NULL, "sessionToken" uuid DEFAULT uuid_generate_v4(), "permissions" text array DEFAULT '{}', "vehicleNumber" json, "isAvailable" boolean, "location" character varying, "totalEarnings" double precision DEFAULT '0', "rideHistory" json, "paymentMethod" character varying, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6620cd026ee2b231beac7cfe57" ON "user" ("role") `);
        await queryRunner.query(`CREATE TABLE "ride" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "pickupLocation" character varying NOT NULL, "destination" character varying NOT NULL, "status" character varying NOT NULL, "fare" double precision NOT NULL, "distance" double precision NOT NULL, "estimatedTime" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "completedAt" TIMESTAMP, "surgeMultiplier" double precision NOT NULL DEFAULT '1', "customerId" uuid NOT NULL, "driverId" uuid NOT NULL, CONSTRAINT "PK_f6bc30c4dd875370bafcb54af1b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" double precision NOT NULL, "paymentMethod" character varying NOT NULL, "refundStatus" character varying NOT NULL, "paymentDate" TIMESTAMP NOT NULL DEFAULT now(), "customerId" uuid NOT NULL, "rideId" uuid NOT NULL, CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vehicle" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "vehicleModel" character varying NOT NULL, "licensePlate" character varying NOT NULL, "color" character varying NOT NULL, "driverId" uuid NOT NULL, CONSTRAINT "PK_187fa17ba39d367e5604b3d1ec9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ride" ADD CONSTRAINT "FK_d735b5961d843f2af1759b4d6ee" FOREIGN KEY ("customerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ride" ADD CONSTRAINT "FK_a212335bd593ecd23b665309e9d" FOREIGN KEY ("driverId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_967ae37468fd0c08ea0fec41720" FOREIGN KEY ("customerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_af601ea84cf8bb9d45797c94bd3" FOREIGN KEY ("rideId") REFERENCES "ride"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicle" ADD CONSTRAINT "FK_cbb46518af7f7bf832253c62e08" FOREIGN KEY ("driverId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicle" DROP CONSTRAINT "FK_cbb46518af7f7bf832253c62e08"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_af601ea84cf8bb9d45797c94bd3"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_967ae37468fd0c08ea0fec41720"`);
        await queryRunner.query(`ALTER TABLE "ride" DROP CONSTRAINT "FK_a212335bd593ecd23b665309e9d"`);
        await queryRunner.query(`ALTER TABLE "ride" DROP CONSTRAINT "FK_d735b5961d843f2af1759b4d6ee"`);
        await queryRunner.query(`DROP TABLE "vehicle"`);
        await queryRunner.query(`DROP TABLE "payment"`);
        await queryRunner.query(`DROP TABLE "ride"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6620cd026ee2b231beac7cfe57"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
