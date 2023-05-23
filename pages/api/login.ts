import { NextApiRequest, NextApiResponse } from 'next';
// import cookie from 'cookie';
// import prisma from '../../../lib/prisma';
// import AuthService from '@/service/AuthService';
// import { SESSION_ID_COOKIE } from '@/../types/api/auth';
import UserModel from '@/db/models/UserModel';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    switch (method) {
        case 'POST':
            try {
                // const { signature, address } = req.body;
                // const lowerCaseAddress = address.toLowerCase();
                // const user = await prisma.user.findFirst({
                //     where: { walletAddress: lowerCaseAddress },
                // });

                // if (!user) {
                //     return res
                //         .status(400)
                //         .json({ message: 'User is not exist' });
                // }

                // const expectedAddress = (
                //     await ethers.utils.verifyMessage(user.nonce, signature)
                // ).toLowerCase();
                // if (expectedAddress !== user.walletAddress) {
                //     return res
                //         .status(401)
                //         .json({ message: 'Invalid signature' });
                // }

                // const sessionId = await AuthService.openUserSession(user.id);
                // res.setHeader(
                //     'Set-Cookie',
                //     cookie.serialize(SESSION_ID_COOKIE, sessionId, {
                //         htt  pOnly: true,
                //         // secure: process.env.NODE_ENV === 'prod',
                //         sameSite: 'strict',
                //         // domain: process.env.NODE_ENV === 'prod' ? `.${process.env.DOMAIN}` : '',
                //         path: '/',
                //     })
                // );

                // UserModel.fin;
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
