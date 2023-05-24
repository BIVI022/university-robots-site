import { Migration } from '../config/umzug';
import { DataTypes } from 'sequelize';
import UserSession from '../db/models/UserSession';
import UserModel from '../db/models/UserModel';

export const up: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().createTable(UserSession.tableName, {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'user_id',
            references: {
                key: 'id',
                model: {
                    tableName: UserModel.tableName,
                },
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
};

export const down: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().dropTable(UserSession.tableName, {
        cascade: true,
    });
};
