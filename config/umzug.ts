import dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/../.env.local` });
import { Umzug, SequelizeStorage } from 'umzug';
import { sequelize } from '../db';
import fs from 'fs';
import path from 'path';

export const migrator = new Umzug({
    migrations: {
        glob: ['../migrations/*.ts', { cwd: __dirname }],
    },
    context: sequelize,
    storage: new SequelizeStorage({
        sequelize,
    }),
    logger: console,
    create: {
        folder: 'migrations',
        template: (filepath) => [
            [
                filepath,
                fs
                    .readFileSync(
                        path.join(__dirname, '../sample-migration.ts')
                    )
                    .toString(),
            ],
        ],
    },
});

export type Migration = typeof migrator._types.migration;
