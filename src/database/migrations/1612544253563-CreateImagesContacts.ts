import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateImagesContacts1612544253563 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'images',
                columns: [
                    {
                        name: "id",
                        type: "integer",
                        unsigned: true,
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "path",
                        type: "varchar",
                    },
                    {
                        name: "contact_id",
                        type: "integer",
                    },
                ],
                foreignKeys: [
                    {
                        name: "ImageContact",
                        columnNames: ["contact_id"],
                        referencedTableName: "contacts",
                        referencedColumnNames: ["id"],
                        onUpdate: "CASCADE",
                        onDelete: "CASCADE",
                    },
                ],
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('images')
    }

}
