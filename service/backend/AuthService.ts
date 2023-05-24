import UserSession from '@/db/models/UserSession';
import { v4 } from 'uuid';

class AuthService {
    readonly SESSION_ID_COOKIE = 'sId';

    async openUserSession(userId: number) {
        const sessionId = v4();
        const existingSession = await UserSession.findOne({
            where: {
                userId,
            },
        });
        if (existingSession) {
            await existingSession.update({ token: sessionId });
        } else {
            await UserSession.create({
                userId,
                token: sessionId,
            });
        }

        return sessionId;
    }
}

export default new AuthService();
