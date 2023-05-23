import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from 'sequelize';
import bcrypt from 'bcrypt';
import { sequelize } from '../db';

export enum USER_ROLES {
    USER = 'user',
    ADMIN = 'admin',
}

export default class UserModel extends Model<
    InferAttributes<UserModel>,
    InferCreationAttributes<UserModel>
> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare email: string;
    declare password: string;
    declare role: USER_ROLES;

    static hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 5);
    }

    static validatePassword(
        password: string,
        hashPassword: string
    ): Promise<boolean> {
        return bcrypt.compare(password, hashPassword);
    }
}

UserModel.init(
    {
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
    },
    {
        sequelize,
        tableName: 'users',
        timestamps: false,
    }
);
