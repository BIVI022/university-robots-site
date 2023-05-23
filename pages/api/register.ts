import { NextApiRequest, NextApiResponse } from 'next';
// import cookie from 'cookie';
// import prisma from '../../../lib/prisma';
// import AuthService from '@/service/AuthService';
// import { SESSION_ID_COOKIE } from '@/../types/api/auth';
import UserModel, { USER_ROLES } from '@/db/models/UserModel';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    switch (method) {
        case 'POST':
            try {
                const { email, name, password } = req.body;
                const user = await UserModel.findOne({
                    where: {
                        email,
                    },
                });
                if (user) {
                    return res.status(400).json({
                        errors: [
                            {
                                value: 'email',
                                message: 'Данный пользователь уже существует',
                            },
                        ],
                    });
                }
                const hashPassword = await UserModel.hashPassword(password);
                await UserModel.create({
                    email,
                    name,
                    password: hashPassword,
                    role: USER_ROLES.USER,
                });
                res.json({ ok: true });
            } catch (_error) {
                res.json({ ok: false });
            }
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
};
