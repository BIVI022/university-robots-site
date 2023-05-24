import { Migration } from '../config/umzug';
import { DataTypes } from 'sequelize';
import UserModel from '../db/models/UserModel';

export const up: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().createTable(UserModel.tableName, {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
};

export const down: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().dropTable(UserModel.tableName, {
        cascade: true,
    });
};
