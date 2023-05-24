import { Migration } from '../config/umzug';
import { DataTypes } from 'sequelize';

export const up: Migration = async ({ context: sequelize }) => {
    throw Error('Up migration not implemented');
};

export const down: Migration = async ({ context: sequelize }) => {
    throw Error('Down migration not implemented');
};
