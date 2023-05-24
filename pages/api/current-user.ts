import { NextApiRequest, NextApiResponse } from 'next';
import { withAuth } from '@/middlewares/auth-middleware';

export default withAuth(async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    switch (method) {
        case 'GET':
            if (!req.user) {
                return res.status(401).end();
            }
            res.json(req.user);
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
});
