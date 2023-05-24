import UserSession from '@/db/models/UserSession';
import AuthService from '@/service/backend/AuthService';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

export const getUserFromSessionId = async (req: NextApiRequest) => {
    const sessionId = req.cookies[AuthService.SESSION_ID_COOKIE];
    if (!sessionId) {
        return null;
    }
    const sessionIdInstance = await UserSession.findOne({
        where: {
            token: sessionId,
        },
        include: 'user',
    });
    if (!sessionIdInstance) {
        return null;
    }

    return sessionIdInstance.user!;
};

export const withAuth =
    (handler: NextApiHandler) =>
    async (req: NextApiRequest, res: NextApiResponse) => {
        const user = await getUserFromSessionId(req);
        req.user = user;
        handler(req, res);
    };
