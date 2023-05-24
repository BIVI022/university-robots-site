import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import UserModel from '@/db/models/UserModel';
import AuthService from '@/service/backend/AuthService';
import { withAuth } from '@/middlewares/auth-middleware';

export default withAuth(async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    switch (method) {
        case 'POST':
            try {
                const { email, password } = req.body;
                const user = await UserModel.findOne({
                    where: {
                        email,
                    },
                });
                if (!user) {
                    return res.status(400).json({
                        errors: [
                            {
                                value: 'password',
                                message: 'Неверные данные для входа',
                            },
                        ],
                    });
                }
                const isValidPassword = await UserModel.validatePassword(
                    password,
                    user.password
                );
                if (!isValidPassword) {
                    return res.status(400).json({
                        errors: [
                            {
                                value: 'password',
                                message: 'Неверные данные для входа',
                            },
                        ],
                    });
                }
                const sessionId = await AuthService.openUserSession(user.id);
                res.setHeader(
                    'Set-Cookie',
                    cookie.serialize(AuthService.SESSION_ID_COOKIE, sessionId, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'strict',
                        path: '/',
                    })
                );
                res.status(200).end();
            } catch (_error) {
                res.json({ ok: false });
            }
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
});
