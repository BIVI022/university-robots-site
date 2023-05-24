import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    Association,
} from 'sequelize';
import { sequelize } from '../db';
import UserModel from './UserModel';

export default class UserSession extends Model<
    InferAttributes<UserSession>,
    InferCreationAttributes<UserSession>
> {
    declare id: CreationOptional<number>;
    declare userId: number;
    declare token: string;

    user?: UserModel;

    static associations: {
        user: Association<UserSession, UserModel>;
    };
}

UserSession.init(
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'user_id',
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'user_sessions',
        timestamps: false,
    }
);

UserSession.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'user',
});
UserModel.hasOne(UserSession, {
    foreignKey: 'userId',
    as: 'session',
});
