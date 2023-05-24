import { Sequelize } from 'sequelize';
import UserModel from '@/db/models/UserModel';

let sequelizeInstance: Sequelize | null = null;

export const sequelize = initialize();

function initialize() {
    if (sequelizeInstance) {
        return sequelizeInstance;
    }
    sequelizeInstance = new Sequelize(
        process.env.POSTGRESQL_DATABASE!,
        process.env.POSTGRESQL_USER!,
        process.env.POSTGRESQL_PASSWORD!,
        {
            dialect: 'postgres',
            host: process.env.POSTGRESQL_HOST,
            port: Number(process.env.POSTGRESQL_PORT),
            pool: {
                idle: 0,
            },
            logging: false,
            // logging: process.env.NODE_ENV === 'dev' ? console.log : false
        }
    );
    return sequelizeInstance;
}
